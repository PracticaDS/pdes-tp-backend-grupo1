import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  }
})

const User = mongoose.model('User', userSchema)

const connectDb = () => {
  return mongoose.connect('mongodb://localhost:27017/factory')
}

export { connectDb, User }
