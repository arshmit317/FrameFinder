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
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch("/api/movies");

        if (!response.ok) {
          throw new Error(
            `API request failed: ${response.status}`
          );
        }

        const movieData: Movie[] = await response.json();

        console.log("Movies received:", movieData);

        const savedMovies: Movie[] = JSON.parse(
          localStorage.getItem("savedMovies") || "[]"
        );

        const availableMovies = movieData.filter(
          (movie) =>
            !savedMovies.some(
              (savedMovie) =>
                savedMovie.id === movie.id
            )
        );

        setMovies(availableMovies);
      } catch (error) {
        console.error("Error loading movies:", error);
      }
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

  if (movies.length === 0) {
    return <p>Loading movies...</p>;
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

        <div className="movieGrid">
          {movies.slice(0, 3).map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
              poster={movie.poster}
              onSave={() => saveMovie(movie)}
            />
          ))}
        </div>

        <Link href="/search">
          Browse All Movies
        </Link>
      </main>
    </div>
  );
}