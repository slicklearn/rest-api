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