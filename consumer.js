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

const consumer = new kafka.Consumer(client, topics, options);

function GetMessage(message) {
  this.message = message;
  consumer.on("message", function(message, err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Here is the kafka message... " + JSON.stringify(message));
      console.log(message.value + ": ");
    }
  });
}

GetMessage();
module.exports = {
  GetMessage: GetMessage
};
