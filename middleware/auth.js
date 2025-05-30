const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

exports.protect = async(req, res, next) => {
    let token;

    //check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    //IF no token found, deny access
    //handling missing token-> if not token is provided,
    if (!token) {
        return res.status(401).json({ error: ' you are not logged in. please log in to get access'});
    }

    try {
        //verify token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //CHECK IF THE USER STILL EXISTS IN THE DATABASE
        const currentUser = await User.findById(decoded.userId);
        if(!currentUser) {
            return res.status(401).json({ error: "The user belonging to this token does not exists."});
        }

        //attach the user data to the request objects
        req.user = currentUser;

        //proceed to the next middle/controller
        next();
    } catch(err) {
        return res.status(401).json({ error: "Invalid token or token expired already"});   
    }

};