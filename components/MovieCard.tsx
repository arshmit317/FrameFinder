import Link from "next/link";

type MovieCardProps = {
  id: number;
  title: string;
  year: number;
  genre: string;
  poster: string;
  onSave: () => void;
};

export default function MovieCard({
  id,
  title,
  year,
  genre,
  poster,
  onSave,
}: MovieCardProps) {
  const handleSave = () => {
    const savedMovies = JSON.parse(
      window.localStorage.getItem("savedMovies") || "[]"
    );

    const alreadySaved = savedMovies.some(
      (movie: { id: number }) => movie.id === id
    );

    if (alreadySaved) {
      return;
    }

    onSave();
  };

  const savedMovies =
    typeof window !== "undefined"
      ? JSON.parse(
          window.localStorage.getItem("savedMovies") || "[]"
        )
      : [];

  const saved = savedMovies.some(
    (movie: { id: number }) => movie.id === id
  );

  return (
    <div className="movieCard">
      {poster && (
    <img
      src={poster}
      alt={`${title} poster`}
      width="200"
      height="300"
    />
  )}
      <h2>{title}</h2>

      <p>
        <strong>Year:</strong> {year}
      </p>

      <p>
        <strong>Genre:</strong> {genre}
      </p>

      <button onClick={handleSave} disabled={saved}>
        {saved ? "Saved" : "Add to Saved"}
      </button>

      <Link href={`/movie/${id}`}>
        View Details
      </Link>
    </div>
  );
}