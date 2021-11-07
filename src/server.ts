import { createConnection } from "typeorm";
import cookieParser from 'cookie-parser';
import express from "express";
import morgan from "morgan";
import cors from 'cors'
import dotenv from 'dotenv';
import "reflect-metadata";

dotenv.config();

import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import subRoutes from './routes/subs';
import miscRoutes from './routes/misc';
import userRoutes from './routes/users';

import trim from "./middleware/trim";

const app = express();
const PORT = process.env.PORT || 5000


app.use(express.json());
app.use(morgan("dev"));
app.use(trim)
app.use(cookieParser())
app.use(
    cors({
        credentials: true,
        origin: process.env.ORIGIN,
        optionsSuccessStatus: 200,
    }))

app.use(express.static('public'))

app.get('/api', (_, res) => res.send("Hello Newells"));
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/subs', subRoutes)
app.use('/api/misc', miscRoutes)
app.use('/api/users', userRoutes)


app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`)

    try {
        await createConnection()
        console.log('Database connected')
    } catch (err) {
        console.log(err)
    }
});

