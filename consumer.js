const kafka = require("kafka-node");
const Consumer = kafka.Consumer;
const client = kafka.Client("localhost:2181");

topics = [
  {
    topic: "employees"
  }
];
const options = {
  autoCommit: true
};

const consumer = new kafka.ConsumerStream(client, topics, options);

consumer.on("message", function(message, err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Here is the kafka message... " + JSON.parse(message));
  }
});

// consumer.on("error", function(err) {
//   console.log("error", err);
// });

// consumer.on("uncaughtException", function(err) {
//   console.log(err);
// });

// const admin = new kafka.Admin(client);
// admin.listTopics((err, res) => {
//   console.log("topics", res);
// });
