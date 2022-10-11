import express from "express";
import { Message } from "./message";
const app = express();
const port = 3000

app.use(express.json());

let http = require("http").Server(app)
let io = require("socket.io")(http);

const chat = io.of("/chatRoom");
chat.on("connection", (socket: any) => {
    socket.on("Welcome", (message: Message) => {
        socket.join(message.room);
        chat.in(message.room).emit("Welcome", message);
    });
    socket.on("message", (message: Message) => {
        chat.in(message.room).emit("message", message);
    });
    socket.on("leave", (message: Message) => {
        socket.leave(message.room);
        chat.in(message.room).emit("leave", message);
    });
});

http.listen(port, () => {
    console.log(`Server Connected localhost:${port}`)
})
