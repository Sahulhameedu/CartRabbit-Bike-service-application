const express = require('express');
const { createBooking, updateBookingStatus, getBookingsForOwner, getBookingsForCustomer, getBookingById } = require('../controllers/bookingController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.put('/:id/status', authMiddleware, updateBookingStatus);
router.get('/owner', authMiddleware, getBookingsForOwner);
router.get('/customer', authMiddleware, getBookingsForCustomer);
router.get('/:id', authMiddleware, getBookingById);
module.exports = router;
