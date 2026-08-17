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
  const [watchedMovies, setWatchedMovies] =
    useState<WatchedMovie[]>([]);

  const [reviews, setReviews] =
    useState<Review[]>([]);

  /*
   * Load localStorage after the initial render.
   * This prevents a server/client hydration mismatch.
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      /*
       * -----------------------------
       * LOAD WATCHED MOVIES
       * -----------------------------
       */

      try {
        const storedMovies =
          localStorage.getItem(
            "watchedMovies"
          );

        if (storedMovies) {
          const parsedMovies =
            JSON.parse(storedMovies);

          if (Array.isArray(parsedMovies)) {
            setWatchedMovies(
              parsedMovies as WatchedMovie[]
            );
          }
        }
      } catch (error) {
        console.error(
          "Failed to load watched movies:",
          error
        );
      }

      /*
       * -----------------------------
       * LOAD REVIEWS
       * -----------------------------
       */

      try {
        const storedReviews =
          localStorage.getItem("reviews");

        if (storedReviews) {
          const parsedReviews =
            JSON.parse(storedReviews);

          if (Array.isArray(parsedReviews)) {
            setReviews(
              parsedReviews as Review[]
            );
          }
        }
      } catch (error) {
        console.error(
          "Failed to load reviews:",
          error
        );
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
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
              /*
               * Get every review made for this movie.
               */
              const movieReviews =
                reviews.filter(
                  (review) =>
                    review.movieTitle ===
                      movie.title &&
                    review.rating >= 0
                );

              /*
               * Calculate the average rating.
               */
              const averageRating =
                movieReviews.length > 0
                  ? movieReviews.reduce(
                      (total, review) =>
                        total +
                        review.rating,
                      0
                    ) /
                    movieReviews.length
                  : 0;

              /*
               * Find the current user's review.
               */
              const userReview =
                reviews.find(
                  (review) =>
                    review.movieTitle ===
                      movie.title &&
                    review.username === "You"
                );

              /*
               * Round the average for
               * displaying stars.
               */
              const roundedAverage =
                Math.round(
                  averageRating
                );

              return (
                <div
                  className="movieCard"
                  key={movie.id}
                >
                  <h2>{movie.title}</h2>

                  <p>
                    <strong>
                      Year:
                    </strong>{" "}
                    {movie.year}
                  </p>

                  <p>
                    <strong>
                      Genre:
                    </strong>{" "}
                    {movie.genre}
                  </p>

                  {/* 
                   * -------------------------
                   * AVERAGE USER RATING
                   * -------------------------
                   */}

                  <div className="averageRating">
                    <strong>
                      Average User Rating:
                    </strong>{" "}

                    {movieReviews.length >
                    0 ? (
                      <>
                        <span className="stars">
                          {"★".repeat(
                            roundedAverage
                          )}

                          {"☆".repeat(
                            5 -
                              roundedAverage
                          )}
                        </span>

                        <span className="ratingNumber">
                          {" "}
                          {averageRating.toFixed(
                            2
                          )}
                          /5
                        </span>

                        <span>
                          {" "}
                          (
                          {
                            movieReviews.length
                          }{" "}
                          {movieReviews.length ===
                          1
                            ? "review"
                            : "reviews"}
                          )
                        </span>
                      </>
                    ) : (
                      <span>
                        {" "}
                        No ratings yet
                      </span>
                    )}
                  </div>

                  {/* 
                   * -------------------------
                   * USER'S REVIEW
                   * -------------------------
                   */}

                  <div className="movieReview">
                    <strong>
                      Your Review:
                    </strong>

                    {userReview ? (
                      <>
                        <p>
                          {
                            userReview.review
                          }
                        </p>

                        <div className="userRating">
                          <strong>
                            Your Rating:
                          </strong>

                          <span className="stars">
                            {"★".repeat(
                              Math.max(
                                0,
                                Math.min(
                                  5,
                                  userReview.rating
                                )
                              )
                            )}

                            {"☆".repeat(
                              Math.max(
                                0,
                                5 -
                                  Math.max(
                                    0,
                                    Math.min(
                                      5,
                                      userReview.rating
                                    )
                                  )
                              )
                            )}
                          </span>

                          <span className="ratingNumber">
                            {
                              userReview.rating
                            }
                            /5
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="noReview">
                        You have not
                        reviewed this
                        movie yet.
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