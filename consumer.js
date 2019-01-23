const kafka = require("kafka-node");
const Consumer = kafka.Consumer;
const client = kafka.KafkaClient("localhost:9092");

consumer = new Consumer(client, [
  {
    topic: "employees"
  }
]);

consumer.on("message", function(message) {
  console.log(
    "Here is the kafka message... " +
      JSON.parse(message.j_name, message.event_id)
  );
});

consumer.on("error", function(err) {
  console.log("error", err);
});

process.on("uncaughtException", function(err) {
  console.log(err);
});
