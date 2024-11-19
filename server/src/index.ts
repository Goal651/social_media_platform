import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Server } from 'socket.io'
import router from './routes/routes'

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI as string

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/', router)

const server = http.createServer(app)
const io = new Server(server)

mongoose.connect(mongoUri)
    .then(() => {
        server.listen(PORT)
        console.log('connected to db\nlistening to ', PORT)
    })
    .catch((err) => {
        console.log(err)
    })

