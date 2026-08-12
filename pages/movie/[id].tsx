import { useRouter } from "next/router";
import { sampleMovies } from "../search";

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) {
    return <p>Loading...</p>;
  }

  const movie = sampleMovies.find(
    (movie) => movie.id === Number(id)
  );

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
      <h1>{movie.title}</h1>

      <p>
        <strong>Year:</strong> {movie.year}
      </p>

      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>

      <p>
        <strong>Rating:</strong> {movie.rating}/10
      </p>
    </div>
  );
}