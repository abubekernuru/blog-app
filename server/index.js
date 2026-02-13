const express = require('express');
const app = express();


app.get('/', (req, res)=>{
    res.send("Hello Abuki check!")
})

app.listen(3002, ()=>{
    console.log("app is listening on port 3002")
})