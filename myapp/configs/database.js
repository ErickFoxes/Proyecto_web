'use strict';

const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.connect(mongodb.URI, {
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db => console.log('Connection successfully established'))
    .catch(err => console.error(err));
