var port = 3000,
    http = require("http"),
    express = require("express"),
    app = express(),
    server = http.createServer(app),
    io = socketio.listen(server);

app.configure(function () {
    app.use(express.cookieParser());
    app.use(express.session({secret: 'secret', key: 'express.sid'}));
});


app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

server = http.createServer(app)
server.listen(3000);