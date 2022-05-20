
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
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
      email: user.email,
      token: generateToken(user._id)
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
  
  const {email, password} = req.body

  const user = await User.findOne({email})
 
  // check user and password match
  if(user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')

  }
  
  //res.send('Login route')

})
// @desc Get current user
// @route /api/v1/users/me
// @access Private 
const getMe = asyncHandler( async (req, res) => {
  
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).send(user)

})

// generate Token
const generateToken = (id) => {
  console.log("got to the generate token")
  return jwt.sign({id}, process.env.JWT_SECRET, {
  expiresIn: '30d'
})
}

module.exports ={
  registerUser, loginUser, getMe
}