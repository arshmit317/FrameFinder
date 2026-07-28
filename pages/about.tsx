import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <h2>About Film Finder</h2>

        <p>
          Film Finder is a movie search application that helps users discover
          movies, save favorites, keep track of watched films, and write
          reviews.
        </p>
      </main>

      <Footer />
    </>
  );
}