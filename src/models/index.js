import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  factories: []
})

const User = mongoose.model('User', userSchema)

const models = { User }
const mongo = process.env.MONGO_URL || 'mongodb://localhost:27017/factory';
const connectDb = () => {
  return mongoose.connect(mongo)
}

export { connectDb, User, models }
