const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//this is the thought schema
const thoughtSchema = new Schema(
    {
        thoguhtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        
        username: {
            type: String,
            required: true
        },

        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

// this is the reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },

        username: {
            type: String,
            required: true
        },
        
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports