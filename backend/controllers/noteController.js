const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

// @desc Get notes for a ticket
// @route GET /api/v1/tickets/ticket:id/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  //Get user from jwt
  const user = await getUser(req.user.id);
  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const notes = await Note.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});

// @desc create a ticket note
// @route POST /api/v1/tickets/:ticketId/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
  //validate input
  const { text } = req.body;

  // basic validation
  if (!text) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //get user from jwt
  const user = await getUser(req.user.id);

  const note = await Note.create({
    user: req.user.id,
    ticket: req.params.ticketId,
    text,
  });

  res.status(200).send(note);
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
  getNotes,
  createNote,
};
