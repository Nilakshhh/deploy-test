import React, { useState, useEffect } from "react";
import "./Reviews.css";
import { format } from "date-fns";
import ReviewCard from "./Reviewcard";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import axios from "axios";

function Reviews() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        var url = apiUrl + "/users/view_reviews"
        const response = await axios.get(url);
        setReviewsData(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    fetchReviews();
  });

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <div className="reviews-container" id="reviews">
      <h2 className="section-title">Reviews</h2>
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {reviewsData.map((review, index) => (
            <CarouselItem key={index}>
              <ReviewCard
                name={review.title}
                date={format(new Date(review.reviewDate), "MMMM dd, yyyy")}
                review={review.reviewDescription}
                rating={review.rating}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Reviews;
