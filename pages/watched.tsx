import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SavedMovieCard from "../components/SavedMovieCard";

export default function Watched() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <h2>Watched Movies</h2>

        <SavedMovieCard />
      </main>

      <Footer />
    </>
  );
}