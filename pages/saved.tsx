import { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SavedMovieCard from "../components/SavedMovieCard";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
};

export default function Saved() {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const movies = JSON.parse(
      localStorage.getItem("savedMovies") || "[]"
    );

    setSavedMovies(movies);
  }, []);

  const removeMovie = (id: number) => {
    const updatedMovies = savedMovies.filter(
      (movie) => movie.id !== id
    );

    setSavedMovies(updatedMovies);

    localStorage.setItem(
      "savedMovies",
      JSON.stringify(updatedMovies)
    );
  };

  return (
    <>
      <Header />
      <Navbar />

      <main>
        <h2>Saved Movies</h2>

        {savedMovies.length === 0 ? (
          <p>No saved movies.</p>
        ) : (
          savedMovies.map((movie) => (
            <SavedMovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
              onRemove={() => removeMovie(movie.id)}
            />
          ))
        )}
      </main>

      <Footer />
    </>
  );
}