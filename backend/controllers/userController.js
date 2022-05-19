const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
// @desc Register new user
// @route /api/v1/users
// @access Public 
const registerUser = asyncHandler( async (req, res) => {

  const {name, email, password} = req.body

  // basic validation 
  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }
  // find if user already exists
  const userExists = await User.findOne({email})

  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create user
  const user = await User.create({
    name, email, password: hashedPassword
  })

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else{
    res.status(400)
    throw new Error('Invalid user data provided')
  }
  // console.log(req.body)
  // res.json(req.body)

})
// @desc Login user
// @route /api/v1/users/login
// @access Public 
const loginUser = asyncHandler( async (req, res) => {
  res.send('Login route')

})
module.exports ={
  registerUser, loginUser
}