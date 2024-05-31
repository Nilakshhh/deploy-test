// src/ServiceTable.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceTable = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [services, setServices] = useState([]);
  const [, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [editedService, setEditedService] = useState({
    title: '',
    description: '',
    cost: '',
    link: ''
  });

  useEffect(() => {
    fetchServices();
  });

  const fetchServices = async () => {
    var url = apiUrl + "/admins/service"
    axios.get(url)
    .then(response => {
      setServices(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the services!', error);
    });
  }

  const handleEdit = (id) => {
    const serviceToEdit = services.find(service => service._id === id);
    setCurrentService(serviceToEdit);
    setEditedService({
      title: serviceToEdit.title,
      description: serviceToEdit.description,
      cost: serviceToEdit.cost,
      link: serviceToEdit.link
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentService(null);
    setShowModal(false);
  };

  const updateService = () => {
    var url = apiUrl + "/admins/service"
    axios.put(url, {
      id: currentService._id,
      title: editedService.title,
      description: editedService.description,
      cost: editedService.cost,
      link: editedService.link
    })
    .then(response => {
      console.log('Service updated successfully:', response.data);
      closeModal(); // Close modal after successful update
    })
    .catch(error => {
      console.error('Error updating service:', error);
      });
  };

  useEffect(() => {
    var url = apiUrl + "/admins/service"
    axios.get(url)
      .then(response => {
        console.log(response.data);
        setServices(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the services!', error);
      });
  });

  
  const handleDelete = (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this service?");
  
    if (userConfirmed) {
      console.log(`Delete service with id: ${id}`);
      
      // Example delete request using fetch API
      var url = apiUrl + `/admins/service/${id}`
      fetch(url, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Service deleted successfully', data);
        // Optionally, update the UI to reflect the deletion
      })
      .catch(error => {
        console.error('There was a problem with the delete request:', error);
      });
    } else {
      // User cancelled, do nothing
      console.log('Delete action cancelled by user');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedService(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(editedService);
  };
  

  return (
    <div className="container mx-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Cost</th>
            <th className="border px-4 py-2">Link</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service._id}>
              <td className="border px-4 py-2">{service._id}</td>
              <td className="border px-4 py-2">{service.description}</td>
              <td className="border px-4 py-2">{service.title}</td>
              <td className="border px-4 py-2">{service.cost}</td>
              <td className="border px-4 py-2">
                <a href={service.link} target="_blank" rel="noopener noreferrer">View</a>
              </td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleEdit(service._id)}>
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(service._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {currentService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-lg mx-auto my-6">
            {/* Content */}
            <div className="bg-white rounded-lg shadow-lg relative flex flex-col w-full p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Edit Service</h3>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={closeModal}>
                  <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                          d="M12.293 10l3.646 3.646a.5.5 0 0 1-.708.708L11.585 10 8.938 6.354a.5.5 0 0 1 .708-.708L12.293 9l2.647-2.646a.5.5 0 0 1 .708.708L13.001 10l2.646 2.646a.5.5 0 0 1-.708.708L12.293 11l-2.647 2.646a.5.5 0 0 1-.708-.708L11.585 10 8.938 6.354a.5.5 0 0 1 .708-.708L12.293 9z"/>
                  </svg>
                </button>
              </div>
              {/* Form */}
              <form onSubmit={updateService}>
                 {/* Title */}
                 <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <input type="text" id="title" name="title" value={editedService.title}
                         onChange={handleInputChange}
                         className="mt-1 p-2 border border-gray-300 rounded w-full"/>
                </div>
                {/* Description */}
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <input type="text" id="description" name="description" value={editedService.description}
                         onChange={handleInputChange}
                         className="mt-1 p-2 border border-gray-300 rounded w-full"/>
                </div>
                {/* Cost */}
                <div className="mb-4">
                  <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost</label>
                  <input type="text" id="cost" name="cost" value={editedService.cost}
                         onChange={handleInputChange}
                         className="mt-1 p-2 border border-gray-300 rounded w-full"/>
                </div>
                {/* Link */}
                <div className="mb-4">
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
                  <input type="text" id="link" name="link" value={editedService.link}
                         onChange={handleInputChange}
                         className="mt-1 p-2 border border-gray-300 rounded w-full"/>
                </div>
                <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ServiceTable;
