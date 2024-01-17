import mongoose from 'mongoose'
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/PATIL'

const dbconnection = async () => {
  try {
    await mongoose.connect(MONGODB_URL).then(conn => {
      console.log(`connect to DB ${conn.connection.host}`)
    })
  } catch (error) {
    console.log('DB is not connect')
  }
}

export default dbconnection
