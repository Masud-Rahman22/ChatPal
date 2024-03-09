const express = require('express');
const app = express();
const http = require('http');
const expressServer = http.createServer(app);
const cors = require('cors');
const { Server } = require('socket.io');
const io = new Server(expressServer);
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())


io.on('connection', (socket) => {
    console.log("user is connected")

    setInterval(() => {
        let d = new Date()
        let t = d.getTime()
        socket.send(t)
    }, 10)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

expressServer.listen(port, () => {
    console.log(`Project is running properly on port ${port}`);
})