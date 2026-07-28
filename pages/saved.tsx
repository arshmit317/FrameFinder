import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SavedMovieCard from "../components/SavedMovieCard";

export default function Saved() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <h2>Saved Movies</h2>

        <SavedMovieCard />
      </main>

      <Footer />
    </>
  );
}