import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getReviews } from "../../store/shop/reviewslice";
import StarRatingComponent from "../common/starrating";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Review({ productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const reviews = useSelector((state) => state.review.reviews) || [];
  const averageRating = useSelector((state) => state.review.averageRating);
  const [rating, setRating] = useState(0);
  const [reviewMsg, setReviewMsg] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (productDetails?._id) {
      dispatch(getReviews(productDetails._id));
    }
  }, [dispatch, productDetails]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user.name,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    )
      .then((data) => {
        if (data.payload?.success) {
          setRating(0);
          setReviewMsg("");
          dispatch(getReviews(productDetails?._id));
          toast({
            title: "Review added successfully!",
          });
        } else {
          toast({
            title: "Already reviewed",
            status: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Failed to add review:", error);
        toast({
          title: "An error occurred. Please try again.",
          status: "error",
        });
      });
  };

  return (
    <div>
      <h1>{productDetails?.name}</h1>
      <div className="text-green-700 text-2xl mt-8">
        <div className="font-bold font-lato">Customer Review</div>

        <div className="max-w-4xl mx-auto p-6 text-center">
          <div className="flex justify-between items-center">
            <div>
              <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
            </div>

            <div className="flex flex-col">
              <h3 className="text-xl text-left mb-4">Share Your Experience</h3>

              <p className="text-gray-600 mb-6 text-sm font-lato">
                No reviews yet for this product! Share your feedback and help
                others make the right choice.
              </p>
            </div>
          </div>

          <Input
            name="reviewMsg"
            value={reviewMsg}
            onChange={(event) => setReviewMsg(event.target.value)}
            placeholder="Write a review..."
          />

          <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>
            Add the review
          </Button>
        </div>

        <div>
          <h2>Average Rating: {averageRating.toFixed(1)}</h2>
          <div>
            {reviews.map((review) => (
              <div key={review._id} className="review">
                <div className="review-header">
                  <span className="review-username">{review.userName}</span>
                  <span className="review-rating">
                    {review.reviewValue} stars
                  </span>
                </div>
                <div className="review-message">{review.reviewMessage}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
