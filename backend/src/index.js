import express from "express";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import {app,server } from "./lib/socket.js";

dotenv.config()


import authRoutes from "./routes/auth.routes.js";
import bodyParser from 'body-parser'; import messageRoutes from "./routes/message.routes.js";



app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as necessary
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.joint(__dirname,"../frontend/dist")));

    app.get("*",(req,res) => {
       res.sendFile(path.joint(__dirname,"../frontend","dist","index.html")); 
    })
}

server.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
    connectDB();
});