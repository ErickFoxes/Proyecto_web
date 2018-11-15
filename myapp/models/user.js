'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    givenname: { type: String, required: true, unique: false },
    lastname: { type: String, required: true, unique: false },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true, unique: false },
    birthdate: { type: Date, required: true, unique: false },
    country: { type: String, required: false, unique: false },
});

UserSchema.statics.authenticate = function (username, password, email,callback) {
    User.findOne({ username: username }, {email: email})
        .exec(function (err, user, email) {
            if (err) {
                return callback(err)
            } else if (!user || !email) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback(new Error('User, e-mail or password are wrong'));
                }
            })
        });
}

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

let User = mongoose.model('users', UserSchema);

module.exports = User;