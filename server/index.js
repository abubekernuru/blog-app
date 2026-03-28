const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

app.use(cors())
app.use(express.json())

dotenv.config();

//routes
const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js')
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Succefully conected to db")
        app.listen(3002, ()=>{
            console.log("app is listening on port 3002")
        })
    })


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})