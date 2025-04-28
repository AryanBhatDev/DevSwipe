
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path'
import { chatRouter } from './routes/chat.routes';

dotenv.config({path:path.resolve(__dirname,'../.env')})

const app = express();

app.use(express.json())
app.use(cors());

app.use('/api/v1/chat',chatRouter)

const port = process.env.PORT;


app.listen(port,()=>{
    console.log(`Listening to http server on port ${port}`)
})
