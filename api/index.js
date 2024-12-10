import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { routerAuth, routerMovie, routerUser } from './routes/index.js';
import { routerList } from './routes/list.js';
import cors from 'cors'

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Успешное подключение к бд'))
    .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/auth/', routerAuth);
app.use('/api/users/', routerUser)
app.use('/api/movie/', routerMovie)
app.use('/api/lists/', routerList)

app.listen('8800', () => {
    console.log('Получилось')
})