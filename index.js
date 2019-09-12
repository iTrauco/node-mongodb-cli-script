#!/usr/bin/env node
const com = require('commander');
const inquirer = require('inquirer');
const mongoose = require('mongoose');
const { generate } = require('randomstring');
const crypto = require('crypto');

// User Mongoose Model
const User = require('./models/User');

com
.version('1.0.0')
.command('user:add')
.action(options => {

    let _password;

    const questions = [
        { type: 'input', name: 'firstname', message: 'Firstname of the user' },
        { type: 'input', name: 'lastname', message: 'Lastname of the user' },
        { type: 'input', name: 'email', message: 'Email of the user' },
        { type: 'input', name: 'age', message: 'Age of the user' }
    ];

    inquirer
    .prompt(questions)
    .then(answers => {
        return mongoose.connect('mongodb://127.0.0.1:27017/cli-sources', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            const { firstname, lastname, age, email } = answers;
            const numericAge = parseInt(age);
            _password = generate(8);
            const hash  = crypto.createHash('sha256');
            const updatedHashed = hash.update(_password);
            const hashedPassword = hash.digest('base64');

            return User.create({
                firstname,
                lastname,
                email,
                hashedPassword,
                age: numericAge
            });
        });
    }).then(result => {
        console.log('====================== LOGIN INFO ======================');
        console.log(`Username: ${result.email}`);
        console.log(`Password: ${_password}`);
        process.exit();
    }).catch(error => {
        console.log(error);
        process.exit();
    });
});

com.parse(process.argv);
// import mongoose from 'mongoose';
// import User from './models/User';
// import App from 'commander';

// const mockedUser = {
//     firstname: 'Melinda',
//     lastname: 'Pinkerton',
//     email: 'm.pinkerton@gmail.com',
//     hashedPassword: 'password',
//     age: 34
// };

// App
// .version('1.0.0')
// .action(options => {
//     mongoose.connect('mongodb://127.0.0.1:27017/cli-source', {
//         useNewUrlParser: true
//     }).then(() => {
//         return User.create(mockedUser);
//     }).then(response =>  {
//         console.log(response);
//         process.exit();
//     });
// });