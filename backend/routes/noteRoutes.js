const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { getNotes, createNote } = require("../controllers/noteController");

const router = express.Router({
  mergeParams: true, // make sure we get params from tickets route
});

router.route("/").get(protect, getNotes).post(protect, createNote);

module.exports = router;

// route /api/v1/tickets/:ticketId/notes
