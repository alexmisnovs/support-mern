const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc Get user tickets
// @route GET /api/v1/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  //Get user from jwt
  const user = await getUser(req.user.id);
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc Get ticket
// @route GET /api/v1/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  //Get user from jwt
  const user = await getUser(req.user.id);
  //handle mongoose error
  let ticket;

  try {
    const ticket = await Ticket.findById(req.params.id);
  } catch (error) {
    throw new Error("Not recognized");
  }

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(ticket);
});

// @desc create user ticket
// @route POST /api/v1/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  //validate input
  const { product, description } = req.body;

  // basic validation
  if (!product || !description) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //get user from jwt
  const user = await getUser(req.user.id);

  const ticket = await Ticket.create({
    user: req.user.id,
    product,
    description,
  });

  res.status(200).send(ticket);
});

// @desc Get user tickets
// @route DELETE /api/v1/tickets
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  //Get user from jwt

  // get user to make sure we are authorized to delete
  const user = await getUser(req.user.id);
  //check if user owns this ticket or is admin
  const ticketToBeDeleted = await Ticket.findById(req.params.id);

  // probably there is a better way.
  if (req.user.id !== ticketToBeDeleted.user.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }
  await ticketToBeDeleted.remove();
  res.status(200).json({ success: true });
});

// @desc Get ticket
// @route GET /api/v1/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
  //Get user from jwt
  const user = await getUser(req.user.id);
  //handle mongoose error
  let ticket;

  try {
    ticket = await Ticket.findById(req.params.id);
  } catch (error) {
    throw new Error("Not recognized");
  }

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  let updatedTicket;
  try {
    updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  } catch (error) {
    throw new Error("Couldn't update ticket");
  }

  res.status(200).json(updatedTicket);
});

// get user from jwt
const getUser = async id => {
  const user = await User.findById(id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  return user;
};

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
