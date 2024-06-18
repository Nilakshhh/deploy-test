import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Rating } from "@mui/material";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import "./ReviewCard.css";

function ReviewCard({ name, date, review, rating }) {
  return (
    <div className="card-container">
      <Card className="card-content">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <CardTitle className="review-name pl-4 pt-4">{name}</CardTitle>
          </div>
          <div className="flex items-center">
            <Rating
              className="pl-4 pt-2"
              name="read-only"
              value={rating}
              precision={0.5}
              readOnly
            />
          </div>
          <div className="review-name flex items-center">
            <CalendarMonthTwoToneIcon className="pl-2 pt-2" />
            <CardDescription className="text-base pl-2 pt-2">
              {date}
            </CardDescription>
          </div>
        </div>
        <CardDescription className="rating-text p-4">{review}</CardDescription>
      </Card>
    </div>
  );
}

export default ReviewCard;
