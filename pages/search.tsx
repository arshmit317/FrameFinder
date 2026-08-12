import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import MovieFilters from "../components/MovieFilters";

export const sampleMovies = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    genre: "Science Fiction",
    rating: 10,
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 8,
  },
  {
    id: 3,
    title: "Barbie",
    year: 2023,
    genre: "Comedy",
    rating: 7,
  },
];
type Movie = (typeof sampleMovies)[number];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  
  const saveMovie = (movie: Movie) => {
  const savedMovies: Movie[] = JSON.parse(
    localStorage.getItem("savedMovies") || "[]"
  );

  const alreadySaved = savedMovies.some(
    (savedMovie: Movie) => savedMovie.id === movie.id
  );

  if (!alreadySaved) {
    localStorage.setItem(
      "savedMovies",
      JSON.stringify([...savedMovies, movie])
    );
  }
};

  const filteredMovies = sampleMovies.filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesGenre =
      genre === "" || movie.genre === genre;

    const matchesYear =
      year === "" || movie.year === Number(year);

    const matchesRating =
      rating === "" || movie.rating >= Number(rating);

  return (
    matchesTitle &&
    matchesGenre &&
    matchesYear &&
    matchesRating
  );
});

  return (
        <div className="pageContainer">
      <main>
        <h2>Search Movies</h2>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        <MovieFilters
          genre={genre}
          setGenre={setGenre}
          year={year}
          setYear={setYear}
          rating={rating}
          setRating={setRating}
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
              onSave={() => saveMovie(movie)}
            />
          ))
        )}
      </main>
    </div>
  );
}