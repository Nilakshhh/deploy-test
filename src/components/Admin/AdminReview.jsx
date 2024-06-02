import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminReview.css";

function AdminReview() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [publishedReviews, setPublishedReviews] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const url = `${apiUrl}/admins/review`;
      const response = await axios.get(url);
      const reviews = response.data;
      const published = reviews.filter(
        (review) => review.status === "published"
      );
      const pending = reviews.filter((review) => review.status === "pending");
      setPublishedReviews(published);
      setPendingReviews(pending);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const updateReviewStatus = async (reviewId, newStatus) => {
    try {
      console.log(reviewId, newStatus);
      const url = `${apiUrl}/admins/review/${reviewId}`;
      await axios.post(url, { status: newStatus });
      fetchReviews();
    } catch (error) {
      console.error("Error updating review status:", error);
    }
  };

  const deleteReview = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (userConfirmed) {
      console.log(`Delete review with id: ${id}`);
      const url = `${apiUrl}/admins/review/${id}`;
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
          console.log("Review deleted successfully", data);
          fetchReviews();
        })
        .catch((error) => {
          console.error("There was a problem with the delete request:", error);
        });
    } else {
      console.log("Delete action cancelled by user");
    }
  };

  return (
    <div className="admin-review-container">
      <h1 className="title">Admin Review</h1>
      <div className="review-section">
        <h2 className="subtitle">Pending Reviews</h2>
        <div className="table-wrapper">
          <table className="review-table">
            <thead>
              <tr>
                <th>Review ID</th>
                <th>Rating</th>
                <th>Description</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingReviews.map((review) => (
                <tr key={review._id}>
                  <td data-label="Review ID">{review._id}</td>
                  <td data-label="Rating">{review.rating}</td>
                  <td data-label="Description">{review.reviewDescription}</td>
                  <td data-label="Title">{review.title}</td>
                  <td data-label="Action">
                    <button
                      className="btn btn-publish"
                      onClick={() =>
                        updateReviewStatus(review._id, "published")
                      }
                    >
                      Publish
                    </button>
                    <button
                      className="btn btn-delete"
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
      <div className="review-section">
        <h2 className="subtitle">Published Reviews</h2>
        <div className="table-wrapper">
          <table className="review-table">
            <thead>
              <tr>
                <th>Review ID</th>
                <th>Rating</th>
                <th>Description</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {publishedReviews.map((review) => (
                <tr key={review._id}>
                  <td data-label="Review ID">{review._id}</td>
                  <td data-label="Rating">{review.rating}</td>
                  <td data-label="Description">{review.reviewDescription}</td>
                  <td data-label="Title">{review.title}</td>
                  <td data-label="Action">
                    <button
                      className="btn btn-pending"
                      onClick={() => updateReviewStatus(review._id, "pending")}
                    >
                      Mark as Pending
                    </button>
                    <button
                      className="btn btn-delete"
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
    </div>
  );
}

export default AdminReview;
