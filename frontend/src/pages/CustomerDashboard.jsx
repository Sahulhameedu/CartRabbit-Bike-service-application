import React, { useState, useEffect } from "react";
import api from "../api";
import BookingForm from "../components/BookingForm";
import BookingListCustomer from "../components/BookingListCustomer";
import LogOutBtn from "../components/LogOutBtn";

import useAuth from "../hooks/useAuth";

// Customer dashboard 

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  const fetchBookings = async () => {
    console.log(token);
    console.log("token : I am here");

    try {
      const response = await api.get("/bookings/customer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      setError("Failed to fetch bookings");
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get("/services", {
        headers: { Authorization: token },
      });
      setServices(response.data);
    } catch (error) {
      setError("Failed to fetch services");
    }
  };

  const handleNewBooking = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <div className="text-black">
      <div className="flex  justify-between items-center">
        <h2 className="text-xl font-bold mb-4 mr-4">Customer Dashboard</h2>
        <LogOutBtn />
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <BookingForm
        services={services}
        onNewBooking={handleNewBooking}
        token={token}
      />

      <BookingListCustomer bookings={bookings} />
    </div>
  );
};

export default CustomerDashboard;
