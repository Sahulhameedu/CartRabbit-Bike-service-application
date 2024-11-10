import React, { useEffect, useState } from "react";
import api from "../api";
import ServiceFormModal from "../components/ServiceFormModal";
import ServiceList from "../components/ServiceList";
import BookingList from "../components/BookingList";

import useAuth from "../hooks/useAuth";
import LogOutBtn from "../components/LogOutBtn";

// Owner page contains all neccessary items

const OwnerDashboard = () => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const { token, logout } = useAuth();



  useEffect(() => {
    fetchServices();
    fetchBookings();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get("/services", {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      setServices(response.data);
    } catch (error) {
      console.log(error);

      setError("Failed to fetch services");
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings/owner", {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      setError("Failed to fetch bookings");
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleAddService = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex  justify-between items-center">
        <h2 className="text-xl font-bold mb-4">Owner Dashboard</h2>
        <LogOutBtn />
      </div>

      <br />
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleAddService}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New Service
      </button>

      <ServiceList
        services={services}
        onEditService={handleEditService}
        fetchServices={fetchServices}
        token={token}
      />

      <BookingList
        bookings={bookings}
        setBookings={setBookings}
        token={token}
      />

      {showModal && (
        <ServiceFormModal
          onClose={handleModalClose}
          fetchServices={fetchServices}
          editingService={editingService}
          token={token}
        />
      )}
    </div>
  );
};

export default OwnerDashboard;
