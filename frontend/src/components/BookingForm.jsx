import React, { useState } from "react";
import api from "../api";

const BookingForm = ({ services, onNewBooking, token }) => {
  // to pick all available services
  const [selectedServices, setSelectedServices] = useState([]);
  // Date selection 
  const [date, setDate] = useState("");
  // alert error status
  const [error, setError] = useState("");

  // to pick services
  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedServices((prev) => [...prev, value]);
    } else {
      setSelectedServices((prev) => prev.filter((id) => id !== value));
    }
  };

  //create booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/bookings/",
        { serviceIds: selectedServices, date },
        { headers: { Authorization: token } }
      );
      onNewBooking(response.data);
      setSelectedServices([]);
      setDate("");
    } catch (error) {
      console.log(error);
      setError("Failed to create booking");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">Book a Service</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-2">
        <label className="block mb-1">Select Services:</label>
        {services.map((service) => (
          <div key={service._id} className="flex items-center">
            <input
              type="checkbox"
              value={service._id}
              checked={selectedServices.includes(service._id)}
              onChange={handleServiceChange}
              className="mr-2"
            />
            <label>{service.name}</label>
          </div>
        ))}
      </div>

      <div className="mb-2">
        <label className="block mb-1">Choose Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Booking
      </button>
    </form>
  );
};

export default BookingForm;
