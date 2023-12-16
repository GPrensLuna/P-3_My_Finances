import mongoose from 'mongoose'
import {MONGO_URL} from './config.js'

(async () => {
const db = await mongoose.connect(MONGO_URL)
console.log('Database is connected to: ',db.connection.name)
})();