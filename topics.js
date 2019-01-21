var zookeeper = require("node-zookeeper-client");

var client = zookeeper.createClient("localhost:2181");

client.zk.client.getChildren("/brokers/topics", (err, children, stats) => {
  children.forEach(child => console.log(child, stats));

  if (err) {
    console.log(err);
  }
});
