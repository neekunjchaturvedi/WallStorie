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
            className="mt-7 bg-green-600 hover:bg-green-700"
          >
            Add the review
          </Button>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:justify-evenly">
            <div className="flex flex-col justify-center items-center mb-6 sm:mb-0">
              {reviews.length !== 0 ? (
                <>
                  {" "}
                  <h2 className="text-left text-3xl mb-2">
                    {averageRating.toFixed(1)}
                  </h2>
                  <StarRatingComponent rating={averageRating} />
                  <h2 className="text-left text-xl mb-2">Overall Rating</h2>
                </>
              ) : null}
            </div>

            <div className="w-full sm:w-1/2 flex flex-col items-center">
              {reviews.map((review) => (
                <Card
                  key={review._id}
                  className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md bg-green-50 text-gray-800 mb-4"
                >
                  <div className="flex justify-between p-4">
                    <div className="flex space-x-4">
                      <div>
                        <img
                          src="https://source.unsplash.com/100x100/?portrait"
                          alt={review.userName}
                          className="object-cover w-12 h-12 rounded-full bg-gray-500"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{review.userName}</h4>
                        <span className="text-xs text-gray-600">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-yellow-700 font-lato">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className={`w-5 h-5 fill-current ${
                            i < review.reviewValue
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                        </svg>
                      ))}
                      <span className="text-xl font-bold">
                        {review.reviewValue}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 text-sm text-gray-600">
                    <p>{review.reviewMessage}</p>
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
