import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductTable = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  });

  const fetchProducts = async () => {
    try {
      var url = apiUrl + "/admins/product"
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append('title', editingProduct.title);
    formData.append('description', editingProduct.description);
    formData.append('cost', editingProduct.cost);
    formData.append('existingMedia', JSON.stringify(editingProduct.media.filter(item => typeof item === 'string')));

    for (let i = 0; i < editingProduct.media.length; i++) {
      if (typeof editingProduct.media[i] === 'object') { // new files are of type File
        formData.append('media', editingProduct.media[i]);
      }
    }

    try {
      var url = apiUrl + `/admins/products/${id}`
      await axios.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this service?");
    if(userConfirmed){ 
      try {
        var url = apiUrl + `/admins/product/${id}`
        await axios.delete(url);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleRemoveMedia = (index) => {
    const updatedMedia = Array.from(editingProduct.media);
    updatedMedia.splice(index, 1);
    setEditingProduct({ ...editingProduct, media: updatedMedia });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Product Table</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Title</th>
            <th className="py-2">Description</th>
            <th className="py-2">Cost</th>
            <th className="py-2">Media</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">
                {editingProduct && editingProduct._id === product._id ? (
                  <input
                    type="text"
                    value={editingProduct.title}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, title: e.target.value })
                    }
                  />
                ) : (
                  product.title
                )}
              </td>
              <td className="border px-4 py-2">
                {editingProduct && editingProduct._id === product._id ? (
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                  />
                ) : (
                  product.description
                )}
              </td>
              <td className="border px-4 py-2">
                {editingProduct && editingProduct._id === product._id ? (
                  <input
                    type="number"
                    value={editingProduct.cost}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, cost: e.target.value })
                    }
                  />
                ) : (
                  product.cost
                )}
              </td>
              <td className="border px-4 py-2">
                {product.media.map((media, index) => (
                  <div key={index} className="flex items-center">
                    {media.endsWith('.mp4') ? (
                      <video src={apiUrl+`/${media}`} width="100" controls />
                    ) : (
                      <img src={apiUrl + `/${media}`} alt="media" width="100" />
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
              <td className="border px-4 py-2">
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
  );
};

export default ProductTable;
