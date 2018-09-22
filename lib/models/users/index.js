const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchemaObject = {
    firstName: { type: String, lowercase: true, trim: true },
    middleName: { type: String, lowercase: true, trim: true },
    lastName: { type: String, lowercase: true, trim: true },
    countryCode: { type: String, uppercase: true },
    contactNumber: { type: String },
    gender: { type: String, lowercase: true, enum: ['male', 'female', 'other'] },
    dob: { type: Number },
    active: { type: Boolean, required: true },
    profilePicture: { type: String },
    userName: { type: String, lowercase: true, require: true, match: '/^[a-zA-Z0-9]+$/', index: true },
    primaryEmail: { type: String, lowercase: true, required: true, match: /\S+@\S+\.\S+/, index: true },
    salt: { type: String },
    hash: { type: String },
    googleID: { type: String },
    facebookID: { type: String },
    linkedInID: { type: String }
};

const userSchema = new Schema(userSchemaObject, { timestamps: true });

userSchema.methods.setPassword = function ( password ) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userSchema.methods.validPassword = function ( password ) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.userName,
        exp: parseInt(exp.getTime() / 1000)
    }, jwtSecret);
}

userSchema.methods.toAuthJSON = function(){
    return {
       username: this.userName,
       email: this.email,
       token: this.generateJWT(),
   };
};

mongoose.model('users', userSchema);