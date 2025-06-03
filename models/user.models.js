const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userInfoSchema =  new mongoose.Schema({
    fullName : {
        type : String,
        required : [true, "please type in your fullname"]
    },

    phoneNumber : {
        type : String,
        required : [true, "please provide phone number"]
    },

    gender : {
        type : String,
        required : true,
        enum: ["Male", "Female"]
    },

   email: {
        type : String,
        required: [true, 'please provide your email'],
        unique : true,
        lowercase :true,
        validate : [validator.isEmail, 'please provide a valid email']
    },
    
    password : {
        type : String,
        required : [true, 'please provide your password '],
        minlength : 8,
        select : false,
        
    }
    });

    //virtual field for password confirmation 
 userInfoSchema.virtual('password confirm').get(function() {
    return this._passwordConfirm;
});

   //validate password confirmation
 userInfoSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew)return next();
        
    if (this.password !== this.passwordConfirm){
        return next(new Error("Passwords are not the same!")); 
    }
    next();
});


  //hash the password the before savimg it to the database
 userInfoSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userInfoSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User= mongoose.model("User", userInfoSchema);

module.exports = User;