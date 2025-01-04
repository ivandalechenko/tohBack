require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const tweetsRouter = require('./components/tweets/tweets-router');



const PORT = process.env.PORT || 5000;
const app = express()


app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL]
}));
app.use(express.json());
app.use(cookieParser());
app.use('/tweets', tweetsRouter);



const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => {
            console.log(`Server started on PORT = ${PORT}`)
        })
    } catch (e) {
        console.log(e);
    }
}

start()



