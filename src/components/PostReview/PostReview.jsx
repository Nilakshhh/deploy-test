import { useState } from "react";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Rating } from "@mui/material";
import "./PostReview.css";
import axios from 'axios';

// Define schema for form validation
const reviewSchema = z.object({
  name: z.string().min(3).max(50),
  rating: z.number().int().min(1).max(5),
  review: z.string().min(10).max(200),
});

function PostReview() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Validate form data
      reviewSchema.parse({ name, rating, review });
  
      // If validation succeeds, send data to backend using Axios
      var url = apiUrl + "/users/add_review";
      const response = await axios.post(url, {
        rating,
        title: name, // You may want to provide a title field in your form
        description: review,
      });
  
      console.log('Review posted!', response.data);
  
      // Reset form fields and errors
      setName('');
      setRating(0);
      setReview('');
      setErrors({});
    } catch (error) {
      // If validation fails or there's an error in the request, handle it here
      console.log(error);
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        console.error('Axios error:', error.message);
      } else if (error instanceof z.ZodError) {
        // If validation fails, set error state to display validation errors
        const fieldErrors = {};
        error.errors.forEach((err) => {
          const fieldName = err.path[0];
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        // Handle other errors
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="contact-container" id="review">
      <Card className="form-container">
        <CardHeader>
          <h3 className="form-name text-2xl font-bold">Leave a Review</h3>
        </CardHeader>
        <CardContent className="form-text">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              {errors.rating && (
                <span className="error-message">{errors.rating}</span>
              )}
              <Textarea
                className="min-h-[100px]"
                id="review"
                placeholder="Enter your review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              {errors.review && (
                <span className="error-message">{errors.review}</span>
              )}
              <button className="btn-contact" type="submit">
                Submit Review
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostReview;
