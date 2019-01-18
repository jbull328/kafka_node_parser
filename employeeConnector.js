const {
  runSinkConnector,
  ConverterFactory
} = require("sequelize-kafka-connect");

const tableSchema = {
  id: {
    type: "integer",
    allowNull: false,
    primaryKey: true
  },
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
      id: messageValue.payload.id,
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

runSinkConnector(config, [converter], onError).then(config => {
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

const config = {
  kafka: {
    noptions: {
      "metadata.broker.list": "localhost:9092",
      "group.id": "n-test-group",
      "enable.auto.commit": false,
      debug: "all",
      event_cb: true,
      "client.id": "kcs-test"
    },
    tconf: {
      "auto.offset.reset": "earliest",
      "request.required.acks": 1
    }
  },

  topic: "sc_test_topic",
  partitions: 1,
  maxTasks: 1,
  pollInterval: 2000,
  produceKeyed: true,
  produceCompressionType: 0,
  connector: {
    options: {
      host: "localhost",
      port: 5432,
      dialect: "sqlite",
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      storage: path.join(__dirname, "test-db.sqlite")
    },
    database: null,
    user: null,
    password: null,
    maxPollCount: 50,
    table: "accounts",
    incrementingColumnName: "id"
  },
  http: {
    port: 3149,
    middlewares: []
  },
  enableMetrics: true
};
