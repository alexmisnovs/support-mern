const asyncHandler = require('express-async-handler')
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
  console.log(req.body)
  res.json(req.body)

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