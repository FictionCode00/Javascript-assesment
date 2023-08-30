const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    line1: {
        type: String,
        required: true,
        minlength: 8
    },
    line2: String,
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        uppercase: true
    },
    zipCode: {
        type: String,
        required: true,
        maxlength: 10
    }
});

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        match: /^[A-Za-z]+$/,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        match: /^[A-Za-z]+$/,
        minlength: 3
    },
    gender: {
        type: String,
        required: true,
        enum: ['MALE', 'FEMALE', 'OTHERS']
    },
    address: {
        type: addressSchema,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    phone: {
        type: Number,
        required: true,
        match: /^[0-9]+$/,
    }
    
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;