import ReviewForm from "../components/ReviewForm";

type Review = {
  id: number;
  username: string;
  movieTitle: string;
  review: string;
  likes: number;
  dislikes: number;
};

type ReviewsProps = {
  reviews: Review[];
  addReview: (review: Review) => void;
  likeReview: (id: number) => void;
  dislikeReview: (id: number) => void;
  userVotes: {
    [reviewId: number]: "like" | "dislike";
  };
};

export default function Reviews({
  reviews,
  addReview,
  likeReview,
  dislikeReview,
  userVotes,
}: ReviewsProps) {
  return (
    <div className="pageContainer">
      <h1>Movie Reviews</h1>

      {/* Review form */}
      <ReviewForm addReview={addReview} />

      {/* Community reviews */}
      <section className="communityReviews">
        <h2>Community Reviews</h2>

        {reviews.length === 0 ? (
          <p>No community reviews yet.</p>
        ) : (
          <div className="reviewList">
            {reviews.map((review) => (
              <div
                className="reviewTable"
                key={review.id}
              >
                <div className="reviewRow">
                  <strong>Movie</strong>
                  <span>{review.movieTitle}</span>
                </div>

                <div className="reviewRow">
                  <strong>Reviewer</strong>
                  <span>{review.username}</span>
                </div>

                <div className="reviewRow">
                  <strong>Review</strong>
                  <span>{review.review}</span>
                </div>

                <div className="reviewVotes">
                  <button
                    className={
                      userVotes[review.id] === "like"
                        ? "activeLike"
                        : ""
                    }
                    onClick={() =>
                      likeReview(review.id)
                    }
                  >
                    👍 Like {review.likes}
                  </button>

                  <button
                    className={
                      userVotes[review.id] ===
                      "dislike"
                        ? "activeDislike"
                        : ""
                    }
                    onClick={() =>
                      dislikeReview(review.id)
                    }
                  >
                    👎 Dislike {review.dislikes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
