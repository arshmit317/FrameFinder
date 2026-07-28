import { useRouter } from "next/router";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MovieCard from "../../components/MovieCard";

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header />
      <Navbar />

      <main>
        <h2>Movie Details</h2>

        <p>Movie ID: {id}</p>

        <MovieCard />
      </main>

      <Footer />
    </>
  );
}