import mongoose from 'mongoose'

(async () => {
const db = await mongoose.connect(`mongodb://localhost/my_finances`)
console.log('Databas is connected to: ',db.connection.name)
})();