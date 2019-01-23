const kafka = require("kafka-node");
const Consumer = kafka.Consumer;
const client = kafka.KafkaClient();

const consumer = new Consumer(client, [
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

consumer.on("uncaughtException", function(err) {
  console.log(err);
});

const admin = new kafka.Admin(client);
admin.listTopics((err, res) => {
  console.log("topics", res);
});
