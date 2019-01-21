const path = require("path");

const {
  runSinkConnector,
  ConverterFactory
} = require("sequelize-kafka-connect");

const config = {
  kafka: {
    //zkConStr: "localhost:2181/",
    kafkaHost: "localhost:9092",
    logger: null,
    // groupId: "kc-sequelize-test",
    clientName: "kc-sequelize-test-name",
    workerPerPartition: 1,
    options: {
      sessionTimeout: 8000,
      protocol: ["roundrobin"],
      fromOffset: "earliest", //latest
      fetchMaxBytes: 1024 * 100,
      fetchMinBytes: 1,
      fetchMaxWaitMs: 10,
      heartbeatInterval: 250,
      retryMinTimeout: 250,
      requireAcks: 1
      //ackTimeoutMs: 100,
      //partitionerType: 3
    }
  },
  topic: "employees",
  partitions: 1,
  maxTasks: 1,
  pollInterval: 2000,
  produceKeyed: true,
  produceCompressionType: 0,
  connector: {
    options: {
      host: "localhost",
      port: 3306,
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      storage: path.join(__dirname, "/var/lib/mysql/employees")
    },
    database: "employees",
    user: "root",
    password: "6jyYXlOD71*4Ug3m",
    maxPollCount: 50,
    table: "employee",
    incrementingColumnName: "id"
  },
  http: {
    port: 3149,
    middlewares: []
  },
  enableMetrics: true,
  batch: {
    batchSize: 100,
    commitEveryNBatch: 1,
    concurrency: 1,
    commitSync: true
  }
};

const tableSchema = {
  f_name: {
    type: "varchar(255)",
    allowNull: false
  },
  l_name: {
    type: "varchar(255)",
    allowNull: false
  },
  hire_date: {
    type: "varchar(255)",
    allowNull: false
  }
};

const etlFunc = (messageValue, callback) => {
  //type is an example json format field
  if (messageValue.type === "publish") {
    return callback(null, {
      f_name: messageValue.payload.f_name,
      l_name: messageValue.payload.l_name,
      hire_date: messageValue.payload.hire_date
    });
  }

  if (messageValue.type === "unpublish") {
    return callback(null, null); //null value will cause deletion
  }

  callback(new Error("unknown messageValue.type"));
};

const converter = ConverterFactory.createSinkSchemaConverter(
  tableSchema,
  etlFunc
);

runSinkConnector(config, [converter]).then(config => {
  //runs forever until: config.stop();
});

/*
    this example would be able to store kafka message values
    that look like this (so completely unrelated to messages created by a default SourceTask)
    {
        payload: {
            id: 123,
            name: "bla"
        },
        type: "publish"
    }
*/
