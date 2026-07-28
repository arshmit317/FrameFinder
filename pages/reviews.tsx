import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReviewForm from "../components/ReviewForm";

export default function Reviews() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <h2>Movie Reviews</h2>

        <ReviewForm />
      </main>

      <Footer />
    </>
  );
}