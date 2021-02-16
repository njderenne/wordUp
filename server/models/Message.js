const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { Schema } = mongoose;

const messageSchema = new Schema(
    {
        messageText: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        email: {
            type: String,
            required: true
        },
        sender: {
            type: String,
            required: true
        }
    }
)

module.exports = messageSchema;