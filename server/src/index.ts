import 'dotenv/config'

import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'

import configRouter from './routes/index'
import SocketController from './controllers/SocketController/SocketController';
import errorHandler from './middlewares/error.middleware';

export const app = express();
const socket = new SocketController(app)


export const SECRET_KEY = 'secret_key'


const CONNECT_DB = process.env.MONGODB_CONNECT || 'mongodb+srv://Ilya:1998ventru1998@cluster0.ewigdl3.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());



app.use(configRouter)

app.use(errorHandler)


const start = async () => {
   try {

      await mongoose.connect(CONNECT_DB)
      
      socket.server.listen(process.env.PORT || 9000, () => {
         console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT || 9000}`);
       });



   } catch (e) {
      console.log('error')
      
   }
   
}

start()