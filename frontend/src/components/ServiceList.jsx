import React from "react";
import api from "../api";


//Service list for owner 

const ServiceList = ({ services, onEditService, fetchServices, token }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (error) {
      console.log("Failed to delete service", error);
    }
  };

  return (
    <div>
      {services.length > 0 ? (
        <ul>
          {services.map((service) => (
            <li
              key={service._id}
              className="flex justify-between items-center border-b py-2 flex-col lg:flex-row"
            >
              <div>
                <h4 className="font-semibold">{service.name}</h4>
                <p>{service.description}</p>
                <p>₹{service.price}</p>
              </div>
              <div className="flex flex-nowrap ml-7">
                <button
                  onClick={() => onEditService(service)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No services available. Please add some services.</p>
      )}
    </div>
  );
};

export default ServiceList;
