import { useEffect, useState } from "react";
import Link from "next/link";
import MovieCard from "../components/MovieCard";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  poster: string;
};

export default function Home() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch("/api/movies");
      const movies: Movie[] = await response.json();

      const savedMovies: Movie[] = JSON.parse(
        localStorage.getItem("savedMovies") || "[]"
      );

      const availableMovie = movies.find(
        (movie) =>
          !savedMovies.some(
            (savedMovie) =>
              savedMovie.id === movie.id
          )
      );

      setMovie(availableMovie || movies[0]);
    };

    getMovies();
  }, []);

  const saveMovie = (movie: Movie) => {
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

  if (!movie) {
    return null;
  }

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
          key={movie.id}
          id={movie.id}
          title={movie.title}
          year={movie.year}
          genre={movie.genre}
          poster={movie.poster}
          onSave={() => saveMovie(movie)}
        />

        <Link href="/search">
          Browse All Movies
        </Link>
      </main>
    </div>
  );
}