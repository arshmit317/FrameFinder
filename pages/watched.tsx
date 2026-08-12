import { useEffect, useState } from "react";

type WatchedMovie = {
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

export default function Watched() {
  const [watchedMovies, setWatchedMovies] = useState<WatchedMovie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const storedMovies = window.localStorage.getItem("watchedMovies");
    const storedReviews = window.localStorage.getItem("reviews");

    try {
      setWatchedMovies(
        storedMovies ? JSON.parse(storedMovies) : []
      );

      setReviews(
        storedReviews ? JSON.parse(storedReviews) : []
      );
    } catch {
      setWatchedMovies([]);
      setReviews([]);
    }
  }, []);

  return (
    <div className="pageContainer">
      <main>
        <h2>Watched Movies</h2>

        {watchedMovies.length === 0 ? (
          <p>No watched movies yet.</p>
        ) : (
          <div className="watchedMovies">
            {watchedMovies.map((movie) => {
              const userReview = reviews.find(
                (review) =>
                  review.movieTitle === movie.title &&
                  review.username === "You"
              );

              return (
                <div className="movieCard" key={movie.id}>
                  <h2>{movie.title}</h2>

                  <p>
                    <strong>Year:</strong> {movie.year}
                  </p>

                  <p>
                    <strong>Genre:</strong> {movie.genre}
                  </p>

                  <div className="movieReview">
                    <strong>Your Review:</strong>

                    {userReview ? (
                      <>
                        <p>{userReview.review}</p>

                        <div className="userRating">
                          <strong>Your Rating:</strong>

                          <span className="stars">
                            {"★".repeat(userReview.rating)}
                            {"☆".repeat(
                              5 - userReview.rating
                            )}
                          </span>

                          <span className="ratingNumber">
                            {userReview.rating}/5
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="noReview">
                        You haven't reviewed this movie yet.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}