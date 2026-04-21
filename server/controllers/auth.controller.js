const User = require('../model/user.model.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error.js');


const signup = async (req, res, next)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password || username===""|| email===""|| password===""){
        return res.status(400).json({message: "All fields are required"})
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    try {
        await newUser.save()
        res.status(200).json(newUser);
    } catch (error) {
        next(error)
    }
}

const signin = async (req, res, next)=>{

    const {email, password} = req.body;

    if(!email || !password || email==="" || password===""){
        return res.status(400).json({message: "All fields are required!"})
    }

    const user = await User.findOne({email});

    if(!user){
        return next(errorHandler(400, "User not found!"))
    }
    const isValid = bcryptjs.compareSync(password, user.password)
    if(!isValid){
        return next(errorHandler(400, "Invalid Credentials"))
    }
    try {
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
        const {password: pass, ...rest} = user._doc;
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        }).json(rest);
    } catch (error) {
        next(error)
    }

}

const googleAuth = async (req, res, next)=>{
    const {name, email, avatar} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = user._doc;
            res.status(200).cookie('access_token', token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        }).json(rest);
            
        } else{
            const newUsername = name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);
            const generatedPw = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPw, 10);
            const newUser = new User({
                username: newUsername,
                email: email,
                password: hashedPassword,
                avatar: avatar
            })
            await newUser.save();
            const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = newUser._doc;
            res.status(200).cookie('access_token', token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        }).json(rest);
        }
        
    } catch (error) {
        next(error)
    }
}


module.exports = {signup, signin, googleAuth}
