import React from "react";
import { useParams } from "react-router-dom";

function PostReview() {
  const { id } = useParams();

  return (
    <div>
      <h2>Post a Review for Dealer #{id}</h2>
      <form>
        <textarea placeholder="Write your review here..." rows="5" cols="50" />
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default PostReview;
