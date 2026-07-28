"use client";

import { useFavorites } from "@/components/context/FavoritesContext";

type SavedMovieCardProps = {
  id: number;
  title: string;
  year: number;
  genre: string;
};

export default function SavedMovieCard({
  id,
  title,
  year,
  genre,
}: SavedMovieCardProps) {
  const { removeFavorite } = useFavorites();

  return (
    <div className="movieCard">
      <h2>{title}</h2>

      <p>
        <strong>Year:</strong> {year}
      </p>

      <p>
        <strong>Genre:</strong> {genre}
      </p>

      <button onClick={() => removeFavorite(id)}>
        Remove from Saved
      </button>
    </div>
  );
}