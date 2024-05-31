import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminReview() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [publishedReviews, setPublishedReviews] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  });

  const fetchReviews = async () => {
    try {
      var url = apiUrl + "/admins/review"
      const response = await axios.get(url);
      const reviews = response.data;
      const published = reviews.filter(review => review.status === 'published');
      const pending = reviews.filter(review => review.status === 'pending');
      setPublishedReviews(published);
      setPendingReviews(pending);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const updateReviewStatus = async (reviewId, newStatus) => {
    try {
        console.log(reviewId, newStatus);
        var url = apiUrl + `/admins/review/${reviewId}`;
      await axios.post(url, { status: newStatus });
      fetchReviews();
    } catch (error) {
      console.error('Error updating review status:', error);
    }
  };

  const deleteReview = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this service?");
  
    if (userConfirmed) {
      console.log(`Delete service with id: ${id}`);
      
      // Example delete request using fetch API
      var url = apiUrl + `/admins/review/${id}`
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
        console.log('Review deleted successfully', data);
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Review</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Pending Reviews</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Review ID</th>
              <th className="py-2">Rating</th>
              <th className="py-2">Description</th>
              <th className="py-2">Title</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingReviews.map(review => (
              <tr key={review._id}>
                <td className="border px-4 py-2">{review._id}</td>
                <td className="border px-4 py-2">{review.rating}</td>
                <td className="border px-4 py-2">{review.reviewDescription}</td>
                <td className="border px-4 py-2">{review.title}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => updateReviewStatus(review._id, 'published')}
                  >
                    Publish
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteReview(review._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Published Reviews</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Review ID</th>
              <th className="py-2">Rating</th>
              <th className="py-2">Description</th>
              <th className="py-2">Title</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {publishedReviews.map(review => (
              <tr key={review._id}>
                <td className="border px-4 py-2">{review._id}</td>
                <td className="border px-4 py-2">{review.rating}</td>
                <td className="border px-4 py-2">{review.reviewDescription}</td>
                <td className="border px-4 py-2">{review.title}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => updateReviewStatus(review._id, 'pending')}
                  >
                    Mark as Pending
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteReview(review._id)}
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
}

export default AdminReview;
