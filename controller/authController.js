import userModel from '../model/usermodel.js'
import emailValidator from 'email-validator'
const cookieOption = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: false
}
const signup = async (req, res, next) => {
  const { name, email, password, conformPassword } = req.body
  console.log(name, email, password, conformPassword)

  if (!email || !password || !conformPassword || !name) {
    return res.status(400).json({
      sucess: true,
      msg: 'all field are required'
    })
  }

  const valideEmail = emailValidator.validate(email)
  if (!valideEmail) {
    return res.send(400).json({
      sucess: false,
      msg: 'email is not valide'
    })
  }

  if (password != conformPassword) {
    return res.status(400).json({
      sucess: false,
      msg: 'password is not match'
    })
  }
  try {
    const userInfo = userModel(req.body)
    const result = await userInfo.save()
    return res.status(200).json({
      sucess: true,
      data: result
    })
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({
        sucess: false,
        msg: 'Acount already exists with provided  email id'
      })
    }

    return res.status(400).json({
      sucess: false,
      msg: e.message
    })
  }
}

const signin = async (req, res, next) => {
  const { email, password } = req.body
  const { token } = req.cookies
  console.log(token)
  try {
    if (!email || !password) {
      return res.status(400).json({
        sucess: false,
        msg: 'all field is required'
      })
    }

    const user = await userModel.findOne({ email }).select('+password')

    if (!user ||!( await bcrypt.compare( user.password !== password))){
      return res.status(400).json({
        sucess: false,
        msg: 'invalid creaditials'
      })}

    const token = user.jwtToken()
    user.password = undefined

    res.cookie('token', token, cookieOption)
    res.status(400).json({
      seccess: true,
      msg: 'user login zala',
      data: user,
      token
    })
  } catch (e) {
    res.status(400).json({
      seccess: true,
      data: e.message
    })
  }
}

const getUser = async (req, res) => {
  const userId = req.user.id

  try {
    const user = await userModel.findById(userId)
    return res.status(400).json({
      success: true,
      data: user
    })
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

const logout = async (req, res, next) => {
  try {
    const coikiesOpation = {
      expires: new Date(),
      httpsOnly: true
    }
    res.cookie('token,null,cookieOption')
    res.status(200).json({
      success: true,
      messege: 'logged Out'
    })
  } catch (error) {
    res.status(400).json({
      success: true,
      message: e,
      message
    })
  }
}

export { signup, signin, getUser,logout }
