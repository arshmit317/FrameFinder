import {useEffect, useState } from "react";
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
  likes: number;
  dislikes: number;
};

type ReviewFormProps = {
  addReview: (review: Review) => void;
};

export default function ReviewForm({
  addReview,
}: ReviewFormProps) {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const storedMovies = JSON.parse(
      localStorage.getItem("savedMovies") || "[]"
    );

    setSavedMovies(storedMovies);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();

    if (!selectedMovie || !reviewText.trim()) {
      return;
    }

    const movie = savedMovies.find(
      (movie) =>
        movie.id.toString() === selectedMovie
    );

    if (!movie) {
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      username: "You",
      movieTitle: movie.title,
      review: reviewText.trim(),
      likes: 0,
      dislikes: 0,
    };

    addReview(newReview);

    setSelectedMovie("");
    setReviewText("");
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
          You need to save a movie before writing
          a review.
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

      <button
        type="submit"
        disabled={
          savedMovies.length === 0 ||
          !selectedMovie ||
          !reviewText.trim()
        }
      >
        Submit Review
      </button>
    </form>
  );
}
//Review Form