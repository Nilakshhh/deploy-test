// src/components/ProductForm.js
import { useState } from "react";
import axios from "axios";
import "./ProductForm.css";

const ProductForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [media, setMedia] = useState([]);

  const handleMediaChange = (e) => {
    setMedia(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("cost", cost);
    for (let i = 0; i < media.length; i++) {
      formData.append("media", media[i]);
    }

    try {
      var url = apiUrl + "/admins/product";
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMedia([]);
      alert("Product submitted successfully!");
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Product title must be unique"
      ) {
        alert("Error: Product title must be unique.");
      } else {
        alert("Error submitting product. Please try again.");
      }
      console.error("Error submitting product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Cost</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Media</label>
        <input
          type="file"
          multiple
          onChange={handleMediaChange}
          className="form-input"
          accept="image/*,video/*"
        />
      </div>
      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
