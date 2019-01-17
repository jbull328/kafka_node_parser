const fs = require("fs");
const parse = require("csv-parse");

const kafka = require("kafka-node");
const Producer = kafka.Producer;
const client = new kafka.Client("localhost:2181");

const testTopic = "test";

(KeyedMessage = kafka.KeyedMessage),
  (producer = new Producer(client)),
  (km = new KeyedMessage("key", "message")),
  (testProducerReady = false);

producer.on("ready", function() {
  console.log("Producer for tests is ready");
  testProducerReady = true;
});

producer.on("error", function(err) {
  console.error("Problem with producing Kafka message " + err);
});

const inputFile = "testReport.csv";

var dataArray = [];

var parser = parse({ delimiter: "," }, function(err, data) {
  dataArray = data;
  handleData(1);
});

fs.createReadStream(inputFile).pipe(parser);

function handleData(currentData) {
  let line = dataArray[currentData];
  var rxScope = dataArray[currentData][4];
  let dataNode = {
    store: line[0],
    date: line[1],
    rxScope: rxScope,
    rxCount: line[5]
  };
  console.log(JSON.stringify(dataNode));
  produceDataMessage(dataNode);
  let delay = 0;
  setTimeout(handleData.bind(null, currentData + 1), delay);
}

function produceDataMessage(dataNode) {
  (KeyedMessage = kafka.KeyedMessage),
    (dataNodeKM = new KeyedMessage(dataNode.code, JSON.stringify(dataNode))),
    (payloads = [{ topic: testTopic, messages: dataNodeKM, partition: 0 }]);
  if (testProducerReady) {
    producer.send(payloads, function(err, data) {
      console.log(data);
    });
  } else {
    console.error(
      "Sorry, TestProducer is not ready yet, failed to produce message to kafka"
    );
  }
}
