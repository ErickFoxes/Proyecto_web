'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema({
    username: String,
    givenname: String,
    lastname: String,
    password: String,
    email: String,
    gender: String, 
    age: Number,
    country: String
}, 
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.models.user || mongoose.model('user', UserSchema);