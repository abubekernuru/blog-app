// const User = require('../model/user.model.js');
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const errorHandler = require('../utils/error.js');


// const signup = async (req, res, next)=>{
//     const {username, email, password} = req.body;
//     if(!username || !email || !password || username===""|| email===""|| password===""){
//         return res.status(400).json({message: "All fields are required"})
//     }
//     const hashedPassword = bcryptjs.hashSync(password, 10);
//     const newUser = new User({
//         username,
//         email,
//         password: hashedPassword
//     })
//     try {
//         await newUser.save()
//         res.status(200).json(newUser);
//     } catch (error) {
//         next(error)
//     }
// }

// const signin = async (req, res, next)=>{

//     const {email, password} = req.body;

//     if(!email || !password || email==="" || password===""){
//         return res.status(400).json({message: "All fields are required!"})
//     }

//     const user = await User.findOne({email});

//     if(!user){
//         return next(errorHandler(400, "User not found!"))
//     }
//     const isValid = bcryptjs.compareSync(password, user.password)
//     if(!isValid){
//         return next(errorHandler(400, "Invalid Credentials"))
//     }
//     try {
//         const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
//         const {password: pass, ...rest} = user._doc;
//         res.cookie('access_token', token, {
//             httpOnly: true,
//             secure: true,
//             sameSite: 'None'
//             })
//         .status(200).json(rest)
//     } catch (error) {
//         next(error)
//     }

// }

// const googleAuth = async (req, res, next)=>{
//     const {name, email, avatar} = req.body;
//     try {
//         const user = await User.findOne({email});
//         if(user){
//             const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
//             const {password: pass, ...rest} = user._doc;
//             res.cookie('access_token', token, {
//                 httpOnly: true,
//                 secure: true,
//                 sameSite: 'None'
//                 })
//             .status(200).json(rest)
            
//         } else{
//             const newUsername = name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);
//             const generatedPw = Math.random().toString(36).slice(-8);
//             const hashedPassword = bcryptjs.hashSync(generatedPw, 10);
//             const newUser = new User({
//                 username: newUsername,
//                 email: email,
//                 password: hashedPassword,
//                 avatar: avatar
//             })
//             await newUser.save();
//             const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET);
//             const {password: pass, ...rest} = newUser._doc;
//             res.cookie('access_token', token, {
//                 httpOnly: true,
//                 secure: true,
//                 sameSite: 'None'
//                 })
//             .status(200).json(rest);
//         }
        
//     } catch (error) {
//         next(error)
//     }
// }


// module.exports = {signup, signin, googleAuth}

const User = require('../model/user.model.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error.js');

// Helper for cookie configuration to keep code DRY
const setAuthCookie = (res, token) => {
  return res.cookie('access_token', token, {
    httpOnly: true,
    // Only use secure/sameSite: none in production for cross-site compatibility
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  });
};

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validation: Check for existence and empty strings
  if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email.trim() === '' || password.trim() === '') {
    return next(errorHandler(400, "All fields are required!"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    const isValid = bcryptjs.compareSync(password, user.password);
    if (!isValid) {
      return next(errorHandler(400, "Invalid Credentials"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, 
      process.env.JWT_SECRET
    );

    // Remove password from response
    const { password: pass, ...rest } = user._doc;

    setAuthCookie(res, token).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const googleAuth = async (req, res, next) => {
  const { name, email, avatar } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin }, 
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = user._doc;
      setAuthCookie(res, token).status(200).json(rest);
    } else {
      // Generate a complex random password for new Google users
      const generatedPw = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPw, 10);

      const newUsername = name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);
      
      const newUser = new User({
        username: newUsername,
        email: email,
        password: hashedPassword,
        avatar: avatar // or profilePicture: avatar, depending on your Schema
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin }, 
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = newUser._doc;

      setAuthCookie(res, token).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, googleAuth };