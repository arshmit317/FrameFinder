"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
};

type FavoritesContextType = {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  function addFavorite(movie: Movie) {
    const alreadyAdded = favorites.some(
      (favorite) => favorite.id === movie.id
    );

    if (!alreadyAdded) {
      setFavorites([...favorites, movie]);
    }
  }

  function removeFavorite(id: number) {
    setFavorites(
      favorites.filter((movie) => movie.id !== id)
    );
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}