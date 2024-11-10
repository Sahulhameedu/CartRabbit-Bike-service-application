//List all booking data as list
import React from "react";
import api from "../api";

const BookingList = ({ bookings, setBookings, token }) => {
  // To update booking update using booking ID
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await api.put(
        `/bookings/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) => (booking._id === id ? response.data : booking))
      );
    } catch (error) {
      console.log("Failed to update booking status", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mt-8">Bookings</h2>
      {bookings.length > 0 ? (
        <ul className="text-black">
          {bookings.map((booking) => (
            <li key={booking._id} className="flex justify-between items-start border-b py-2 flex-col lg:flex-row">
              <div>
                <h4 className="font-semibold">Customer: {booking.customerId.name}</h4>
                <p>
                  Service: {booking.serviceIds.map((service) => service.name).join(", ")}
                </p>
                <p>Status: {booking.status}</p>
              </div>
              <div className="mt-6 ml-7">
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="ready for delivery">Ready for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
      <div className="h-8"></div>
    </div>
  );
};

export default BookingList;
