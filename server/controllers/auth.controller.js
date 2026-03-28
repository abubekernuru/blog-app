const User = require('../model/user.model.js');
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error.js')


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



module.exports = {signup}
