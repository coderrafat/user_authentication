const { Schema, model } = require('mongoose');


const DataSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    }

}, { timestamps: true, versionKey: false });

const UserModel = model('users', DataSchema);

module.exports = UserModel;