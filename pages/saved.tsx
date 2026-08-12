import { useState } from "react";
import SavedMovieCard from "../components/SavedMovieCard";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  watched?: boolean;
};

export default function Saved() {
  const [savedMovies, setSavedMovies] = useState<Movie[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedMovies =
        localStorage.getItem("savedMovies");

      return storedMovies
        ? JSON.parse(storedMovies)
        : [];
    } catch {
      return [];
    }
  });

  const removeMovie = (id: number) => {
    const updatedMovies = savedMovies.filter(
      (movie) => movie.id !== id
    );

    localStorage.setItem(
      "savedMovies",
      JSON.stringify(updatedMovies)
    );

    setSavedMovies(updatedMovies);
  };

  const markAsWatched = (movie: Movie) => {
    const watchedMovies: Movie[] = JSON.parse(
      localStorage.getItem("watchedMovies") || "[]"
    );

    const alreadyWatched = watchedMovies.some(
      (watchedMovie) => watchedMovie.id === movie.id
    );

    if (!alreadyWatched) {
      const watchedMovie = {
        ...movie,
        watched: true,
        review: "",
      };

      localStorage.setItem(
        "watchedMovies",
        JSON.stringify([
          ...watchedMovies,
          watchedMovie,
        ])
      );
    }

    const updatedMovies = savedMovies.map(
      (savedMovie) =>
        savedMovie.id === movie.id
          ? { ...savedMovie, watched: true }
          : savedMovie
    );

    localStorage.setItem(
      "savedMovies",
      JSON.stringify(updatedMovies)
    );

    setSavedMovies(updatedMovies);
  };

  return (
    <div className="pageContainer">
      <main>
        <h2>Saved Movies</h2>

        {savedMovies.length === 0 ? (
          <p>No saved movies.</p>
        ) : (
          savedMovies.map((movie) => (
            <SavedMovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
              watched={movie.watched || false}
              onRemove={() => removeMovie(movie.id)}
              onWatched={() => markAsWatched(movie)}
            />
          ))
        )}
      </main>
    </div>
  );
}