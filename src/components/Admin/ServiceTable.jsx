// src/ServiceTable.js
import { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceTable.css"; // Import CSS file for styling

const ServiceTable = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [services, setServices] = useState([]);
  const [, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [editedService, setEditedService] = useState({
    title: "",
    description: "",
    cost: "",
    link: "",
  });

  useEffect(() => {
    fetchServices();
  });

  const fetchServices = async () => {
    var url = apiUrl + "/admins/service";
    axios
      .get(url)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
  };

  const handleEdit = (id) => {
    const serviceToEdit = services.find((service) => service._id === id);
    setCurrentService(serviceToEdit);
    setEditedService({
      title: serviceToEdit.title,
      description: serviceToEdit.description,
      cost: serviceToEdit.cost,
      link: serviceToEdit.link,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentService(null);
    setShowModal(false);
  };

  const updateService = () => {
    var url = apiUrl + "/admins/service";
    axios
      .put(url, {
        id: currentService._id,
        title: editedService.title,
        description: editedService.description,
        cost: editedService.cost,
        link: editedService.link,
      })
      .then((response) => {
        console.log("Service updated successfully:", response.data);
        closeModal(); // Close modal after successful update
      })
      .catch((error) => {
        console.error("Error updating service:", error);
      });
  };

  useEffect(() => {
    var url = apiUrl + "/admins/service";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setServices(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
  });

  const handleDelete = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (userConfirmed) {
      console.log(`Delete service with id: ${id}`);

      // Example delete request using fetch API
      var url = apiUrl + `/admins/service/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Service deleted successfully", data);
          // Optionally, update the UI to reflect the deletion
        })
        .catch((error) => {
          console.error("There was a problem with the delete request:", error);
        });
    } else {
      // User cancelled, do nothing
      console.log("Delete action cancelled by user");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(editedService);
  };

  return (
    <div className="service-container">
      <table className="service-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Title</th>
            <th>Cost</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td className="border px-4 py-2" data-label="ID">
                {service._id}
              </td>
              <td className="border px-4 py-2" data-label="Description">
                {service.description}
              </td>
              <td className="border px-4 py-2" data-label="Title">
                {service.title}
              </td>
              <td className="border px-4 py-2" data-label="Cost">
                {service.cost}
              </td>
              <td className="border px-4 py-2" data-label="Link">
                {" "}
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(service._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(service._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {currentService && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Service</h3>
              <button className="modal-close" onClick={closeModal}>
                X
              </button>
            </div>
            <form onSubmit={updateService}>
              <div className="modal-body">
                <div className="input-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editedService.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    value={editedService.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label>Cost</label>
                  <input
                    type="text"
                    name="cost"
                    value={editedService.cost}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label>Link</label>
                  <input
                    type="text"
                    name="link"
                    value={editedService.link}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ServiceTable;
