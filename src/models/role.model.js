import { Schema, model } from 'mongoose';
import { stringify } from 'querystring';

const schema = new Schema(
    {
        name: String
    }, 
    
    {
        versionKey: false
    }
);

export default model("Role", schema);