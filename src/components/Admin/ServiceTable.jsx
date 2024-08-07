import { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceTable.css"; // Import CSS file for styling

const ServiceTable = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [services, setServices] = useState([]);
  const [uniqueTitles, setUniqueTitles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [editedService, setEditedService] = useState({
    title: "",
    description: "",
    cost: "",
    link: "",
    and_up: false,
  });
  const [newTitle, setNewTitle] = useState(""); // State for new title input

  useEffect(() => {
    fetchServices();
  }, []); // Run only once on component mount

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admins/service`);
      const fetchedServices = response.data;
      setServices(fetchedServices);

      // Extract unique service titles
      const titles = [...new Set(fetchedServices.map(service => service.title.trim()))];
      setUniqueTitles(titles);
    } catch (error) {
      console.error("There was an error fetching the services!", error);
    }
  };

  const handleEdit = (id) => {
    const serviceToEdit = services.find((service) => service._id === id);
    setCurrentService(serviceToEdit);
    setEditedService({
      title: serviceToEdit.title,
      description: serviceToEdit.description,
      cost: serviceToEdit.cost,
      link: serviceToEdit.link,
      and_up: serviceToEdit.and_up,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentService(null);
    setShowModal(false);
    setNewTitle(""); // Reset new title input when closing modal
  };

  const updateService = async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
      // Determine if new title should be added
      let finalTitle = editedService.title;
      if (newTitle.trim()) {
        finalTitle = newTitle.trim();
        if (!uniqueTitles.includes(finalTitle)) {
          setUniqueTitles([...uniqueTitles, finalTitle]);
        }
      }

      const response = await axios.put(`${apiUrl}/admins/service`, {
        id: currentService._id,
        title: finalTitle,
        ...editedService,
      });

      console.log("Service updated successfully:", response.data);
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === currentService._id ? response.data : service
        )
      );
      closeModal(); // Close modal after successful update
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (userConfirmed) {
      try {
        const response = await axios.delete(`${apiUrl}/admins/service/${id}`);
        console.log("Service deleted successfully", response.data);
        setServices((prevServices) =>
          prevServices.filter((service) => service._id !== id)
        );
      } catch (error) {
        console.error("There was a problem with the delete request:", error);
      }
    } else {
      console.log("Delete action cancelled by user");
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditedService((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTitleChange = (event) => {
    const selectedTitle = event.target.value;
    setEditedService((prevState) => ({
      ...prevState,
      title: selectedTitle,
    }));
    setNewTitle(""); // Clear new title input when selecting from dropdown
  };

  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value);
    if (editedService.title === newTitle) {
      setEditedService((prevState) => ({
        ...prevState,
        title: "",
      }));
    }
  };

  return (
    <div className="service-container">
      <table className="service-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Link</th>
            <th>And Up</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td className="border px-4 py-2" data-label="ID">
                {service._id}
              </td>
              <td className="border px-4 py-2" data-label="Title">
                {service.title}
              </td>
              <td className="border px-4 py-2" data-label="Description">
                {service.description}
              </td>
              <td className="border px-4 py-2" data-label="Cost">
                {service.cost}
              </td>
              <td className="border px-4 py-2" data-label="Link">
                <a href={service.link} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
              <td className="border px-4 py-2" data-label="And Up">
                {service.and_up ? "Yes" : "No"}
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
      {showModal && (
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
                  <div className="flex space-x-2">
                    <select
                      name="title"
                      value={editedService.title}
                      onChange={handleTitleChange}
                    >
                      <option value="">Select a Title</option>
                      {uniqueTitles.map((title, index) => (
                        <option key={index} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Add new Title"
                      value={newTitle}
                      onChange={handleNewTitleChange}
                    />
                  </div>
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
                    type="number"
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
                <div className="input-group">
                  <label>And Up</label>
                  <input
                    type="checkbox"
                    name="and_up"
                    checked={editedService.and_up}
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
