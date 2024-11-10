const express = require('express');
const { createBooking, updateBookingStatus, getBookingsForOwner, getBookingsForCustomer, getBookingById } = require('../controllers/bookingController');
const { authMiddleware } = require('../middleware/authMiddleware'); // check authorization (middleware)
const router = express.Router(); 
// To create new booking by customer
router.post('/', authMiddleware, createBooking);
// To update booking by owner
router.put('/:id/status', authMiddleware, updateBookingStatus);
// To get booking list by owner
router.get('/owner', authMiddleware, getBookingsForOwner);
// To get booking by customer
router.get('/customer', authMiddleware, getBookingsForCustomer);
// Get specific booking data
router.get('/:id', authMiddleware, getBookingById);

module.exports = router;
