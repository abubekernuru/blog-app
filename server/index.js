const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({
    origin: 'https://blog-app-drab-two.vercel.app',
    credentials: true
}));
app.use(express.json())

dotenv.config();

//routes
const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js')
const postRoute = require('./routes/post.route.js')
const commentRoute = require('./routes/comment.route.js')
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);

const PORT = process.env.PORT || 3002;
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Succefully conected to db")
        app.listen(PORT, () => {
        console.log(`app is listening on port ${PORT}`);
        });
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