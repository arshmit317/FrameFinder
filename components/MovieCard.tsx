"use client";

import { useFavorites } from "@/components/context/FavoritesContext";

type MovieCardProps = {
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
}: MovieCardProps) {
  const { favorites, addFavorite } = useFavorites();

  const isFavorite = favorites.some((movie) => movie.id === id);

  function handleAddFavorite() {
    addFavorite({
      id,
      title,
      year,
      genre,
    });
  }

  return (
    <div className="movieCard">
      <h2>{title}</h2>

      <p>
        <strong>Year:</strong> {year}
      </p>

      <p>
        <strong>Genre:</strong> {genre}
      </p>

      <button
        onClick={handleAddFavorite}
        disabled={isFavorite}
      >
        {isFavorite ? "Saved" : "Add to Saved"}
      </button>
    </div>
  );
}