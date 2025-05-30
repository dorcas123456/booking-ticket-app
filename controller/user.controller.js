const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

//generate JWToken
const generateToken = (user, secret, expiresIn) => {
   return jwt.sign(
      {email :user.email, userId : user._Id},
      secret,
      {expiresIn}
   )
}

exports.login = async (req, res, next) => {
   const { email, password } = req.body;

   //check if user exist
   if (!email || !password) {
      return next(new Error("please provide email and password", 400));
   }

   const user =await User.findOne({email}).select('+password');
   if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new Error("Incorrect Email or password", 401));
   }

   const token = generateToken(user, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);

   await user.save({validateBeforeSave: false});

   res.status(200).json({
      token
   });
}

exports.signup = async(req, res, next) => {
    const {
        fullName,
        phoneNumber,
        gender,
        email,
        password,
        passwordConfirm
    } = req.body;

    //check if user already exists
    const existingUser =await User.findOne({email});
    if (existingUser) {
       return next(new Error('email is already in use', 400))
    }

    const user = new User({
        fullName,
        phoneNumber,
        gender,
        email,
        password,
        passwordConfirm 
    });

    const result =await user.save();
 res.status(201).json({
    message : "user created successfully ", result
 });
}