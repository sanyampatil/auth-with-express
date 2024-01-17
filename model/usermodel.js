import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import  bcrypt  from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'user name is required'],
      minLength: [5, 'Name must be at least 5 char'],
      maxLength: [50, 'Name must be less than 5 char'],
      trim: true
    },
    email: {
      type: String,
      require: [true, 'user name is required'],
      unique: true,
      lowercase: [true, 'already registerd']
    },
    password: {
      type: String,
      select: false
    },
    forgetPasswordToken: {
      type: String
    },
    forPasswordExpiryDate: {
      type: Date  
    }
    // conformPassword:{
    //   type:String
    // }
  },
  { timestamps: true }
)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 10)

  return next()
})

userSchema.methods.jwtToken = async function () {
  return jwt.sign({ id: this.id, email: this.email }, process.env.SECRET, {
    expiresIn: '24h'
  })
}

const userModel = new mongoose.model('user', userSchema)
export default userModel
