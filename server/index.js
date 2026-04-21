const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const FRONTEND_URL = (process.env.FRONTEND_URL || '').replace(/\/$/, '');
const allowedOrigins = (process.env.ALLOWED_ORIGINS || FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser (curl, mobile) requests
    if (!origin) return callback(null, true);

    const isWhitelisted = allowedOrigins.includes(origin);
    const isVercelPreview = origin && origin.endsWith('.vercel.app'); // optional

    if (isWhitelisted || isVercelPreview) return callback(null, true);

    console.warn('[CORS] Blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

app.use(cookieParser());
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