import React, { useState, useEffect } from "react";
import api from "../api";

// For owner to edit and create new service

const ServiceFormModal = ({
  onClose,
  fetchServices,
  editingService,
  token,
}) => {
  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (editingService) {
      setServiceForm(editingService);
    }
  }, [editingService]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceForm({ ...serviceForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await api.put(`/services/${editingService._id}`, serviceForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/services/add", serviceForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchServices();
      onClose();
    } catch (error) {
      console.log("Failed to save service", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-96"
      >
        <h3 className="text-lg font-semibold mb-4">
          {editingService ? "Edit Service" : "Add New Service"}
        </h3>
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={serviceForm.name}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={serviceForm.description}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={serviceForm.price}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingService ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceFormModal;
