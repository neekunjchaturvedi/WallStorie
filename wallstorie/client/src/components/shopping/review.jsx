import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getReviews } from "../../store/shop/reviewslice";
import StarRatingComponent from "../common/starrating";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "../ui/card";
import { Star } from "lucide-react";

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
        userName: user?.name,
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
          <div className="flex flex-col justify-between items-center">
            <div>
              <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
            </div>
            {reviews.length == 0 ? (
              <p className="text-gray-600 mb-6 text-sm font-lato">
                No reviews yet for this product! Share your feedback and help
                others make the right choice.
              </p>
            ) : null}
            <div className="flex flex-col">
              <h3 className="text-lg text-left mb-4 mt-4">
                Share Your Experience
              </h3>
            </div>
          </div>

          <Input
            name="reviewMsg"
            value={reviewMsg}
            onChange={(event) => setReviewMsg(event.target.value)}
            placeholder="Write a review..."
          />

          <Button
            onClick={handleAddReview}
            disabled={reviewMsg.trim() === ""}
            className="mt-7 bg-green-600"
          >
            Add the review
          </Button>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:justify-evenly">
            <div className="flex flex-col justify-center items-center mb-6 sm:mb-0">
              <h2 className="text-left text-3xl mb-2">
                {averageRating.toFixed(1)}
              </h2>
              <StarRatingComponent rating={averageRating} />
            </div>

            <div className="w-full sm:w-1/2 flex flex-col items-center">
              {reviews.map((review) => (
                <Card
                  key={review._id}
                  className="bg-white shadow-md rounded-lg p-6 mb-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {review.userName}
                        </h2>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex justify-end">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.reviewValue
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill={i < review.reviewValue ? "#fbbf24" : "none"}
                          />
                        ))}
                      </div>
                      <span className="text-md font-bold text-gray-800 font-lato">
                        {review.reviewValue} *
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600 text-left text-sm">
                      {review.reviewMessage}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
