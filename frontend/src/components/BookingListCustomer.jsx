import React from "react";

// Booking list for customer

const BookingListCustomer = ({ bookings }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">My Bookings</h3>

      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="border-b py-2">
              <h4 className="font-semibold">
                Booking Date: {new Date(booking.date).getDate()} /
                {new Date(booking.date).getMonth() + 1} /
                {new Date(booking.date).getFullYear()}
              </h4>
              <p>
                Services:{" "}
                {booking.serviceIds.map((service) => service.name).join(", ")}
              </p>
              <p>
                Status :{""}
                {booking.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available. Please create a booking.</p>
      )}
    </div>
  );
};

export default BookingListCustomer;
