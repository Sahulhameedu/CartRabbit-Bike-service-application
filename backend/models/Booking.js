const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    serviceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }],
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'ready for delivery', 'completed'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);