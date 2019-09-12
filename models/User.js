#!/usr/bin/env node

const { Schema, model } = require('mongoose');

const UserBlueprint = Schema({
    firstname: String,
    lastname: String,
    email: String,
    hashedPassword: String, 
    age: Number
}, {
    versionKey: false
});

module.exports = ('User', UserBlueprint);