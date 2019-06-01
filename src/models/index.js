import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  }
})

const User = mongoose.model('User', userSchema)

const models = { User }

const connectDb = () => {
  return mongoose.connect('mongodb://localhost:27017/factory')
}

export { connectDb, User, models }
