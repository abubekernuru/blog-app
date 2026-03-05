const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.get('/', (req, res)=>{
    res.send("Hello Abuki check!")
})

mongoose.connect('mongodb://localhost:27017/blog')
    .then(()=>{
        console.log("Succefully conected to db")
        app.listen(3002, ()=>{
            console.log("app is listening on port 3002")
        })
    })
