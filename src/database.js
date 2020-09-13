import mongoose from 'mongoose';
import { database_uri } from './config.json'

const settings = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(database_uri, settings)
    .then(db => console.log("Database connected"))
    .catch(error => console.error("Error connecting to database:\n" + error))