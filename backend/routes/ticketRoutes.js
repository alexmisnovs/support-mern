const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const { createTicket, getTickets, deleteTicket } = require('../controllers/ticketController')


router.route('/').get(protect, getTickets).post(protect, createTicket)
router.delete('/delete', protect, deleteTicket)
module.exports = router