import express from "express";
import { Message } from "./message";

const app = express();
app.use(express.json());
let http = require("http").Server(app)
let io = require("socket.io")(http);

const chat = io.of("/chatRoom");
chat.on