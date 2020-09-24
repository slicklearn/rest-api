import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    displayName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    
    bio: {
        type: String,
        default: ""
    },

    followers: [{
        ref: "User",
        type: Schema.Types.ObjectId
    }],

    following: [{
        ref: "User",
        type: Schema.Types.ObjectId
    }],

    courses: [{
        ref: "Course",
        type: Schema.Types.ObjectId
    }],

    comments: [{
        ref: "Comment",
        type: Schema.Types.ObjectId
    }],

    location: {
        type: String,
        default: "Ubicación desconocida"
    },

    avatar: {
        type: String,
        default: "1"
    },

    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

schema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

schema.statics.comparePassword = async (hash, password) => {
    return await bcrypt.compare(hash, password);
}

export default model('User', schema)