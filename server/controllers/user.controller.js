const cloudinary =  require('cloudinary')
const dotenv = require('dotenv');
dotenv.config();

const cloudinaryConfig = cloudinary.v2.config({
    cloud_name: process.env.Cloudinary_Cloud_Name,
    api_key: process.env.Cloudinary_API_Key,
    api_secret: process.env.Cloudinary_API_Secret
});

const generateSignature = (req, res) => {
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, process.env.Cloudinary_API_Secret);
    res.json({ signature, timestamp });
}

const test = (req, res) => {
    res.json({ message: 'User API is working!' });
}

module.exports = { test, generateSignature };