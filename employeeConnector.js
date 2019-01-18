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
