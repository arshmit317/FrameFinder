import { useState } from "react";
import Link from "next/link";
import MovieCard from "../components/MovieCard";
import { sampleMovies } from "./search";

type Movie = (typeof sampleMovies)[number];

export default function Home() {
  const [movie] = useState<Movie>(() => {
    if (typeof window === "undefined") {
      return sampleMovies[0];
    }

    try {
      const savedMovies: Movie[] = JSON.parse(
        localStorage.getItem("savedMovies") || "[]"
      );

      const availableMovie = sampleMovies.find(
        (movie) =>
          !savedMovies.some(
            (savedMovie) =>
              savedMovie.id === movie.id
          )
      );

      return availableMovie || sampleMovies[0];
    } catch {
      return sampleMovies[0];
    }
  });

  const saveMovie = () => {
    const savedMovies: Movie[] = JSON.parse(
      localStorage.getItem("savedMovies") || "[]"
    );

    const alreadySaved = savedMovies.some(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (!alreadySaved) {
      const updatedMovies = [
        ...savedMovies,
        movie,
      ];

      localStorage.setItem(
        "savedMovies",
        JSON.stringify(updatedMovies)
      );

      window.dispatchEvent(
        new Event("savedMoviesChanged")
      );
    }
  };

  return (
    <div className="homePage">
      <main>
        <h2>Welcome to Frame Finder</h2>

        <p>
          Search movies, save your favorites, keep
          track of watched movies, and share reviews.
        </p>

        <h1>New</h1>

        <MovieCard
          id={movie.id}
          title={movie.title}
          year={movie.year}
          genre={movie.genre}
          onSave={saveMovie}
        />

        <Link href="/search">
          Browse All Movies
        </Link>
      </main>
    </div>
  );
}