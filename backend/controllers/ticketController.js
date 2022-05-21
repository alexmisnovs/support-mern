const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc Get user tickets
// @route GET /api/v1/tickets
// @access Private 
const getTickets = asyncHandler( async (req, res) => {
  
  //Get user from jwt
  const user = await getUser(req.user.id)
  const tickets = await Ticket.find({user:req.user.id})

  res.status(200).json(tickets)

})
// @desc create user ticket
// @route POST /api/v1/tickets
// @access Private 
const createTicket = asyncHandler( async (req, res) => {
  
  //validate input
   const {product, description } = req.body

  // basic validation 
  if(!product || !description ) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  //get user from jwt
  const user = await getUser(req.user.id)

  const ticket = await Ticket.create({
    user:req.user.id, product, description
  })

  res.status(200).send(ticket)

})

// @desc Get user tickets
// @route DELETE /api/v1/tickets
// @access Private 
const deleteTicket = asyncHandler( async (req, res) => {
  
  //Get user from jwt
  const {ticketId} = req.body

  // get user to make sure we are authorized to delete
  const user = await getUser(req.user.id)
  //check if user owns this ticket or is admin
  const ticketToBeDeleted = await Ticket.findById(ticketId)

  const userId = user._id.toString();
  const ticketUserId = ticketToBeDeleted.user.toString()
  // probably there is a better way.
  if(userId === ticketUserId){
    await Ticket.deleteOne(ticketToBeDeleted)
    return res.status(200).send('deleted')
  }
  res.status(500).send('something went wrong')

})

// get user from jwt
const getUser = async (id) => {
  const user = await User.findById(id)
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }
  return user
}

module.exports = {
  getTickets, createTicket, deleteTicket
}