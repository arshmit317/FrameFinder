import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="pageContainer">
      <Header />
      <Navbar />

      <main>
        <h2>About Film Finder</h2>

        <p>
          FrameFinder helps users discover, save, review, and track their
          favorite movies.
        </p>
      </main>

      <Footer />
    </div>
  );
}