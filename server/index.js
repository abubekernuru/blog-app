const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

app.get('/', (req, res)=>{
    res.send("Hello Abuki check!")
})

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Succefully conected to db")
        app.listen(3002, ()=>{
            console.log("app is listening on port 3002")
        })
    })
