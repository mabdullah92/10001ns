var port = 3000,
    http = require("http"),
    amqp = require("amqp"),
    socketio = require("socket.io"),
    express = require("express"),
    rabbitMq = amqp.createConnection({ host: '192.168.83.130', reconnect: true }),
    app = express(),
    server = http.createServer(app),
    io = socketio.listen(server);

rabbitMq.on("ready", function () {
	console.log("ready");
  var queue = rabbitMq.queue("dataQ", function () {
    queue.bind("#"); // to all messages
    console.log("bound");
    queue.subscribe(function (message) {
    	//console.log(message);
      io.sockets.emit("new-item", message.data.toString());
    });
  });
});

app.get("/", function (req, res) {
  res.sendfile(__dirname + "/index.html");
});

server.listen(port);
console.log("listening on port " + port);