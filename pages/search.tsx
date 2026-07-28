import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Header />
      <Navbar />

      <main>
        <h2>Search Movies</h2>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <MovieCard />
      </main>

      <Footer />
    </>
  );
}