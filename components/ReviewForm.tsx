import { useState } from "react";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
};

type Review = {
  id: number;
  username: string;
  movieTitle: string;
  review: string;
  rating: number;
  likes: number;
  dislikes: number;
};

type ReviewFormProps = {
  addReview: (review: Review) => void;
};

export default function ReviewForm({
  addReview,
}: ReviewFormProps) {
  const [savedMovies] = useState<Movie[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      return JSON.parse(
        localStorage.getItem("savedMovies") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [selectedMovie, setSelectedMovie] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !selectedMovie ||
      !reviewText.trim() ||
      rating === 0
    ) {
      return;
    }

    const movie = savedMovies.find(
      (movie) => movie.id.toString() === selectedMovie
    );

    if (!movie) {
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      username: "You",
      movieTitle: movie.title,
      review: reviewText.trim(),
      rating: rating,
      likes: 0,
      dislikes: 0,
    };

    addReview(newReview);

    setSelectedMovie("");
    setReviewText("");
    setRating(0);
  };

  return (
    <form
      className="reviewForm"
      onSubmit={handleSubmit}
    >
      <label htmlFor="movieSelect">
        Select a saved movie
      </label>

      <select
        id="movieSelect"
        className="movieSelect"
        value={selectedMovie}
        onChange={(event) =>
          setSelectedMovie(event.target.value)
        }
        required
      >
        <option value="">
          Choose a movie...
        </option>

        {savedMovies.map((movie) => (
          <option
            key={movie.id}
            value={movie.id}
          >
            {movie.title} ({movie.year})
          </option>
        ))}
      </select>

      {savedMovies.length === 0 && (
        <p>
          You need to save a movie before writing a
          review.
        </p>
      )}

      <textarea
        className="reviewTextarea"
        placeholder="Write your review..."
        value={reviewText}
        onChange={(event) =>
          setReviewText(event.target.value)
        }
        required
      />

      <label>Your Rating</label>

      <div className="ratingStars">
        <h2>Rating:</h2>

        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            className={
              star <= rating
                ? "star selected"
                : "star"
            }
            onClick={() => setRating(star)}
          >
            ★
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={
          savedMovies.length === 0 ||
          !selectedMovie ||
          !reviewText.trim() ||
          rating === 0
        }
      >
        Submit Review
      </button>
    </form>
  );
}