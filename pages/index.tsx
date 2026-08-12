import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { sampleMovies } from "./search";

type Movie = (typeof sampleMovies)[number];

export default function Home() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const savedMovies: Movie[] = JSON.parse(
      window.localStorage.getItem("savedMovies") || "[]"
    );

    // Find the first movie that has not been saved
    const availableMovie = sampleMovies.find(
      (movie) =>
        !savedMovies.some(
          (savedMovie) => savedMovie.id === movie.id
        )
    );

    // If all movies are saved, show the first movie
    setMovie(availableMovie || sampleMovies[0]);
  }, []);

  const saveMovie = () => {
    if (!movie) return;

    const savedMovies: Movie[] = JSON.parse(
      window.localStorage.getItem("savedMovies") || "[]"
    );

    const alreadySaved = savedMovies.some(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (!alreadySaved) {
      const updatedMovies = [...savedMovies, movie];

      window.localStorage.setItem(
        "savedMovies",
        JSON.stringify(updatedMovies)
      );

      // Tell other pages/components that saved movies changed
      window.dispatchEvent(
        new Event("savedMoviesChanged")
      );
    }
  };

  if (!movie) {
    return null;
  }

  return (
    <div className="homePage">
      <main>
        <h2>Welcome to Film Finder</h2>

        <p>
          Search movies, save your favorites, keep track of
          watched movies, and share reviews.
        </p>

        <h1>New</h1>

        <MovieCard
          id={movie.id}
          title={movie.title}
          year={movie.year}
          genre={movie.genre}
          onSave={saveMovie}
        />
      </main>
    </div>
  );
}