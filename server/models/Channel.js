const mongoose = require('mongoose');
const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');

const channelSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        createdBy: {
            type: String,
            required: true
        },
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;