const Booking = require("../models/Booking");
const Service = require("../models/Service");
const { transporter } = require("../config/emailService");
const mongoose = require("mongoose");

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const { serviceIds, date } = req.body;

    // Validate if serviceIds is an array and each ID is valid
    if (
      !Array.isArray(serviceIds) ||
      serviceIds.some((id) => !mongoose.Types.ObjectId.isValid(id))
    ) {
      return res.status(400).json({ error: "Invalid service IDs format" });
    }

    if (req.user.role == "owner")
      return res.status(400).json({
        error: "Failed to create booking",
        details: "unauthorized access",
      });

    const booking = new Booking({ serviceIds, date, customerId: req.user.id });

    await booking.save();

    // Populate each serviceId in the booking and notify each owner
    const populatedBooking = await booking.populate("serviceIds");
    const service = populatedBooking.serviceIds[0];

    const owner = await Service.findById(service._id).populate("ownerId");

    //send mail whenever a booking created
    await transporter.sendMail({
      to: owner.email,
      subject: "New Booking Created",
      text: `A new booking has been created on ${date}.`,
    });


    res.status(201).json(populatedBooking);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "Failed to create booking", details: error.message });
  }
};
// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
      .populate("customerId")
      .populate("serviceIds");
    // Notify customer if status is 'ready for delivery'
    if (booking.status === "ready for delivery") {
      const customer = await booking.populate("customerId");
      console.log(customer);
      await transporter.sendMail({
        to: customer.email,
        subject: "Booking Ready for Delivery",
        text: `Your bike service is ready for delivery. Please pick it up at your convenience.`,
      });
     
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: "Failed to update booking status" });
  }
};

exports.getBookingsForOwner = async (req, res) => {
  try {
    // Find all services owned by the current owner
    const ownerServices = await Service.find({ ownerId: req.user.id });
    const serviceIds = ownerServices.map((service) => service._id);

    // Find bookings that include any of the owner's services
    const bookings = await Booking.find({ serviceIds: { $in: serviceIds } })
      .populate("serviceIds") // Populate all services in the booking
      .populate("customerId"); // Populate customer details

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to retrieve bookings" });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("serviceIds") // Populate all services in the booking
      .populate("customerId"); // Populate customer details
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve booking" });
  }
};

exports.getBookingsForCustomer = async (req, res) => {
  try {
    if (req.user.role == "owner")
      return res.status(400).json({
        error: "Failed to create booking",
        details: "Unauthorized access",
      });
    const bookings = await Booking.find({ customerId: req.user.id }).populate(
      "serviceIds"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve bookings" });
  }
};
