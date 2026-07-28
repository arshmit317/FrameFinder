import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const sampleMovies = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    genre: "Science Fiction",
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
  },
  {
    id: 3,
    title: "Barbie",
    year: 2023,
    genre: "Comedy",
  },
];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovies = sampleMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {filteredMovies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          filteredMovies.map((movie) => (
            <MovieCard
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