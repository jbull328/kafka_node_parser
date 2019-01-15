const kafka = require("kafka-node");
const HighLevelConsumer = kafka.HighLevelConsumer;
const Client = kafka.Client;

const client = new Client("localhost:2181");
const topics = [
  {
    topic: "test"
  }
];

const options = {
  autoCommit: true,
  encoding: "JSON"
};

const consumer = new HighLevelConsumer(client, topics, options);

consumer.on("message", function(message) {
  console.log("Here is the kafka message... " + JSON.stringify(message));
});

consumer.on("error", function(err) {
  console.log("error", err);
});
