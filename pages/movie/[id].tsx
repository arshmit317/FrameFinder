/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  poster: string;
  overview: string;
};

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const getMovie = async () => {
      const response = await fetch(`/api/movies?id=${id}`);

      if (response.ok) {
        const data = await response.json();
        setMovie(data);
      }

      setLoading(false);
    };

    getMovie();
  }, [router.isReady, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return (
      <div className="pageContainer">
        <h2>Movie Not Found</h2>
        <p>The movie you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="pageContainer">
      {movie.poster && (
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          width="200"
          height="300"
        />
      )}

      <h1>{movie.title}</h1>

      <p>
        <strong>About:</strong>{" "}
        {movie.overview || "No description available."}
      </p>

      <p>
        <strong>Year:</strong> {movie.year}
      </p>

      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>

      <p>
        <strong>Rating:</strong>{" "}
        {(movie.rating ?? 0).toFixed(1)}/10
      </p>
    </div>
  );
}