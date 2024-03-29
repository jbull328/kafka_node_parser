var zookeeper = require("node-zookeeper-client");

var client = zookeeper.createClient("localhost:2181");

client.getChildren("/", function(error, children, stats) {
  if (error) {
    console.log(error.stack);
    return;
  }

  console.log("Children are: %j.", children);
});

// var path = process.argv[2];

// function listChildren(client, path) {
//   client.getChildren(
//     path,
//     function(event) {
//       console.log("Got watcher event: %s", event);
//       listChildren(client, path);
//     },
//     function(error, children, stat) {
//       if (error) {
//         console.log(
//           "Failed to list children of node: %s due to: %s.",
//           path,
//           error
//         );
//         return;
//       }

//       console.log("Children of node: %s are: %j.", path, children);
//     }
//   );
// }

// client.once("connected", function() {
//   console.log("Connected to ZooKeeper.");
//   listChildren(client, path);
// });
