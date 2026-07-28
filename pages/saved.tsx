import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SavedMovieCard from "../components/SavedMovieCard";
import { useFavorites } from "../components/context/FavoritesContext";

export default function Saved() {
  const { favorites } = useFavorites();

  return (
    <>
      <Header />
      <Navbar />

      <main>
        <h2>Saved Movies</h2>

        {favorites.length === 0 ? (
          <p>No saved movies yet.</p>
        ) : (
          favorites.map((movie) => (
            <SavedMovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
            />
          ))
        )}
      </main>

      <Footer />
    </>
  );
}