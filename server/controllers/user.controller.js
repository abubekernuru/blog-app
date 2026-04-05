const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();
const errorHandler = require('../utils/error.js')
const User = require('../model/user.model.js')
const bcryptjs = require('bcryptjs');

cloudinary.config({
    cloud_name: process.env.Cloudinary_Cloud_Name,
    api_key: process.env.Cloudinary_API_Key,
    api_secret: process.env.Cloudinary_API_Secret
});

const generateSignature = (req, res) => {
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp, upload_preset: 'blog_profile' }, process.env.Cloudinary_API_Secret);
    res.json({ signature, timestamp });
}

const test = (req, res) => {
    res.json({ message: 'User API is working!' });
}

const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    // console.log('updateUser userId:', userId);
    // console.log('updateUser req.user.id:', req.user.id);
    if(userId !== req.user.id) {
        return next(errorHandler(400, 'You are only allowed to update your own account!'));
    }
    const updateFields = {};
    if (req.body.email) updateFields.email = req.body.email;
    if (req.body.avatar) updateFields.avatar = req.body.avatar;

    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400, "Password must be at least 6 characters"))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
        updateFields.password = req.body.password
    }
    if (req.body.username) {
        req.body.username = req.body.username.split(" ").join("").toLowerCase();
        updateFields.username = req.body.username
    }

    try {
        const update = await User.findByIdAndUpdate(userId, 
            {$set:updateFields}, {returnDocument: 'after'});
        // console.log('update result:', update);
        if (!update) {
            return next(errorHandler(404, 'User not found'));
        }
        const {password: pass, ...rest} = update._doc;
        // console.log('sending response 201');
        res.status(201).json(rest);
    } catch (error) {
        console.log('update error:', error);
        next(error)
    }

}

const deleteUser = async (req, res, next) => {
    const {userId} = req.params;
    if(userId !== req.user.id) {
        return next(errorHandler(400, 'You are only allowed to update your own account!'));
    }
    try {
        await User.findByIdAndDelete(userId);
        res.clearCookie('access_token')
        res.status(200).json('User has been deleted succefully')
    } catch (error) {
        next(error)
    }
}


module.exports = { test, generateSignature, updateUser, deleteUser };