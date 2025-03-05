import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          className={`p-2 rounded-full transition-colors ${
            star <= rating
              ? "text-yellow-500 hover:bg-yellow-500"
              : "text-yellow-500 hover:bg-white"
          }`}
          variant="outline"
          size="icon"
          onClick={() => handleRatingChange(star)}
        >
          <StarIcon
            className={`w-6 h-6 ${
              star <= rating ? "fill-yellow-500" : "fill-white"
            }`}
          />
        </Button>
      ))}
    </div>
  );
}

export default StarRatingComponent;
