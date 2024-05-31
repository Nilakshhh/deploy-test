// src/components/ProductForm.js
import { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [media, setMedia] = useState([]);

  const handleMediaChange = (e) => {
    setMedia(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('cost', cost);
    for (let i = 0; i < media.length; i++) {
      formData.append('media', media[i]);
    }
  
    try {
      var url = apiUrl + "/admins/product";
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMedia([]);
      alert('Product submitted successfully!');
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Product title must be unique') {
        alert('Error: Product title must be unique.');
      } else {
        alert('Error submitting product. Please try again.');
      }
      console.error('Error submitting product:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Cost</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Media</label>
        <input
          type="file"
          multiple
          onChange={handleMediaChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          accept="image/*,video/*"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
