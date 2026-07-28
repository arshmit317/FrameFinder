import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <h2>Welcome to Film Finder</h2>
        <p>
          Search movies, save your favorites, keep track of watched movies, and
          share reviews.
        </p>
      </main>

      <Footer />
    </>
  );
}