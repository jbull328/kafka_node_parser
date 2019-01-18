const { runSinkConnector } = require("sequelize-kafka-connect");
runSinkConnector(config, [], onError).then(config => {
  //runs forever until: config.stop();
});
