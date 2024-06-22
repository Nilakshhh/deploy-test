// src/components/ProductTable.js
import { useState, useEffect } from "react";
import axios from "axios";
import "./ProductTable.css"; // Importing the CSS file

const ProductTable = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const url = `${apiUrl}/admins/product`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append("title", editingProduct.title);
    formData.append("description", editingProduct.description);
    formData.append("cost", editingProduct.cost);
    formData.append(
      "existingMedia",
      JSON.stringify(
        editingProduct.media.filter((item) => typeof item === "string")
      )
    );

    for (let i = 0; i < editingProduct.media.length; i++) {
      if (typeof editingProduct.media[i] === "object") {
        formData.append("media", editingProduct.media[i]);
      }
    }

    try {
      const url = `${apiUrl}/admins/product/${id}`;
      await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (userConfirmed) {
      try {
        const url = `${apiUrl}/admins/product/${id}`;
        await axios.delete(url);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleRemoveMedia = (index) => {
    const updatedMedia = Array.from(editingProduct.media);
    updatedMedia.splice(index, 1);
    setEditingProduct({ ...editingProduct, media: updatedMedia });
  };

  return (
    <div className="container">
      <h1>Product Table</h1>
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Media</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border px-4 py-2" data-label="Title">
                  {editingProduct && editingProduct._id === product._id ? (
                    <input
                      type="text"
                      value={editingProduct.title}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          title: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.title
                  )}
                </td>
                <td className="border px-4 py-2" data-label="Description">
                  {editingProduct && editingProduct._id === product._id ? (
                    <textarea
                      value={editingProduct.description}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td className="border px-4 py-2" data-label="Cost">
                  {editingProduct && editingProduct._id === product._id ? (
                    <input
                      type="number"
                      value={editingProduct.cost}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          cost: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.cost
                  )}
                </td>
                <td className="border px-4 py-2" data-label="Media">
                  {product.media.map((media, index) => (
                    <div key={index} className="flex items-center">
                      {media.endsWith(".mp4") ? (
                        <video
                          src={apiUrl + `/${media}`}
                          width="100"
                          controls
                        />
                      ) : (
                        <img
                          src={apiUrl + `/${media}`}
                          alt="media"
                          width="100"
                        />
                      )}
                      {editingProduct && editingProduct._id === product._id && (
                        <button
                          onClick={() => handleRemoveMedia(index)}
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  {editingProduct && editingProduct._id === product._id && (
                    <input
                      type="file"
                      multiple
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          media: [...editingProduct.media, ...e.target.files],
                        })
                      }
                    />
                  )}
                </td>
                <td className="border px-4 py-2" data-label="Actions">
                  {editingProduct && editingProduct._id === product._id ? (
                    <button
                      onClick={() => handleUpdate(product._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
