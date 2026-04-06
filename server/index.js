const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())

dotenv.config();

//routes
const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js')
const postRoute = require('./routes/post.route.js')
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

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