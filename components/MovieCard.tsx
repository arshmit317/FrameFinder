import { useEffect, useState } from "react";

type MovieCardProps = {
  id: number;
  title: string;
  year: number;
  genre: string;
  onSave: () => void;
};

type SavedMovie = {
  id: number;
  title: string;
  year: number;
  genre: string;
};

export default function MovieCard({
  id,
  title,
  year,
  genre,
  onSave,
}: MovieCardProps) {
  const [saved, setSaved] = useState(false);

  // Check localStorage when the card loads
  useEffect(() => {
    const savedMovies: SavedMovie[] = JSON.parse(
      window.localStorage.getItem("savedMovies") || "[]"
    );

    const alreadySaved = savedMovies.some(
      (movie) => movie.id === id
    );

    setSaved(alreadySaved);
  }, [id]);

  const handleSave = () => {
    if (saved) return;

    onSave();

    setSaved(true);
  };

  return (
    <div className="movieCard">
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
    </div>
  );
}