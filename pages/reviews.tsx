import { useState } from "react";

import ReviewForm from "../components/ReviewForm";

type Review = {
  id: number;
  username: string;
  movieTitle: string;
  review: string;
  rating: number;
  likes: number;
  dislikes: number;
};

type ReviewsProps = {
  reviews: Review[];

  addReview: (review: Review) => void;

  updateReview: (
    review: Review
  ) => void;

  deleteReview: (
    id: number
  ) => void;

  likeReview: (
    id: number
  ) => void;

  dislikeReview: (
    id: number
  ) => void;

  userVotes: {
    [reviewId: number]:
      | "like"
      | "dislike";
  };
};

export default function Reviews({
  reviews,
  addReview,
  updateReview,
  deleteReview,
  likeReview,
  dislikeReview,
  userVotes,
}: ReviewsProps) {
  const [editingReviewId, setEditingReviewId] =
    useState<number | null>(null);

  const [editText, setEditText] =
    useState("");

  const [editRating, setEditRating] =
    useState(0);

  // --------------------------------
  // START EDITING
  // --------------------------------

  const startEditing = (
    review: Review
  ) => {
    setEditingReviewId(review.id);
    setEditText(review.review);
    setEditRating(review.rating);
  };

  // --------------------------------
  // CANCEL EDITING
  // --------------------------------

  const cancelEditing = () => {
    setEditingReviewId(null);
    setEditText("");
    setEditRating(0);
  };

  // --------------------------------
  // SAVE EDIT
  // --------------------------------

  const saveEdit = (
    review: Review
  ) => {
    if (!editText.trim() || editRating === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to save these changes to your review?"
    );

    if (!confirmed) {
      return;
    }

    updateReview({
      ...review,
      review: editText.trim(),
      rating: editRating,
    });

    cancelEditing();
  };

  // --------------------------------
  // DELETE REVIEW
  // --------------------------------

  const handleDelete = (
    review: Review
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete your review for "${review.movieTitle}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    deleteReview(review.id);

    if (editingReviewId === review.id) {
      cancelEditing();
    }
  };

  return (
    <div className="pageContainer">
      <h1>Movie Reviews</h1>

      <ReviewForm
        addReview={addReview}
      />

      <section className="communityReviews">
        <h2>Community Reviews</h2>

        {reviews.length === 0 ? (
          <p>
            No community reviews yet.
          </p>
        ) : (
          <div className="reviewList">
            {reviews.map((review) => {
              const isYourReview =
                review.username === "You";

              const isEditing =
                editingReviewId ===
                review.id;

              return (
                <div
                  className="reviewTable"
                  key={review.id}
                >
                  {/* MOVIE */}

                  <div className="reviewRow">
                    <strong>
                      Movie
                    </strong>

                    <span>
                      {review.movieTitle}
                    </span>
                  </div>

                  {/* REVIEWER */}

                  <div className="reviewRow">
                    <strong>
                      Reviewer
                    </strong>

                    <span>
                      {review.username}
                    </span>
                  </div>

                  {/* RATING */}

                  <div className="reviewRow">
                    <strong>
                      Rating
                    </strong>

                    {!isEditing ? (
                      <span className="communityRating">
                        {"★".repeat(
                          review.rating
                        )}

                        {"☆".repeat(
                          5 - review.rating
                        )}

                        <small>
                          {review.rating}/5
                        </small>
                      </span>
                    ) : (
                      <div className="ratingStars">
                        <h3>
                          Change Rating:
                        </h3>

                        {[1, 2, 3, 4, 5].map(
                          (star) => (
                            <button
                              type="button"
                              key={star}
                              className={
                                star <=
                                editRating
                                  ? "star selected"
                                  : "star"
                              }
                              onClick={() =>
                                setEditRating(
                                  star
                                )
                              }
                            >
                              ★
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {/* REVIEW */}

                  <div className="reviewRow">
                    <strong>
                      Review
                    </strong>

                    {!isEditing ? (
                      <span>
                        {review.review}
                      </span>
                    ) : (
                      <textarea
                        className="reviewTextarea"
                        value={editText}
                        onChange={(event) =>
                          setEditText(
                            event.target.value
                          )
                        }
                      />
                    )}
                  </div>

                  {/* EDIT / DELETE */}

                  {isYourReview &&
                    !isEditing && (
                      <div className="reviewActions">
                        <button
                          type="button"
                          onClick={() =>
                            startEditing(
                              review
                            )
                          }
                        >
                          Edit Review
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              review
                            )
                          }
                        >
                          Delete Review
                        </button>
                      </div>
                    )}

                  {/* EDIT CONTROLS */}

                  {isEditing && (
                    <div className="reviewActions">
                      <button
                        type="button"
                        disabled={
                          !editText.trim() ||
                          editRating === 0
                        }
                        onClick={() =>
                          saveEdit(
                            review
                          )
                        }
                      >
                        Save Changes
                      </button>

                      <button
                        type="button"
                        onClick={
                          cancelEditing
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {/* LIKE / DISLIKE */}

                  {!isEditing && (
                    <div className="reviewVotes">
                      <button
                        className={
                          userVotes[
                            review.id
                          ] === "like"
                            ? "activeLike"
                            : ""
                        }
                        onClick={() =>
                          likeReview(
                            review.id
                          )
                        }
                      >
                        👍 Like{" "}
                        {review.likes}
                      </button>

                      <button
                        className={
                          userVotes[
                            review.id
                          ] ===
                          "dislike"
                            ? "activeDislike"
                            : ""
                        }
                        onClick={() =>
                          dislikeReview(
                            review.id
                          )
                        }
                      >
                        👎 Dislike{" "}
                        {review.dislikes}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}