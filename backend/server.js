import express from "express";
import materials from "./materialData.js"
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port)



/*
dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true
}).catch(error => console.log(error.reason));

const app = express();

app.get("/api/materials", (req, res) =>{
    res.send(materials);
})

app.listen(5000, () => {console.log("Server started at http://localhost:5000")})
*/