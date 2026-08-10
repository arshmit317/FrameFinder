import { useRouter } from "next/router";
import MovieCard from "../../components/MovieCard";

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <main>
        <h2>Movie Details</h2>

        <p>Movie ID: {id}</p>

        <MovieCard />
      </main>
    </>
  );
}