import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import MovieFilters from "../components/MovieFilters";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  poster: string;
};

export default function Search() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

useEffect(() => {
  const getMovies = async () => {
    const response = await fetch(
      `/api/movies?search=${encodeURIComponent(searchTerm)}` +
      `&genre=${encodeURIComponent(genre)}` +
      `&year=${encodeURIComponent(year)}` +
      `&rating=${encodeURIComponent(rating)}`
    );

    const data = await response.json();
    setMovies(data);
  };

  getMovies();
}, [searchTerm, genre, year, rating]);

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

  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesGenre =
      genre === "" || movie.genre.includes(genre);

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
          <div className="movieGrid">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
                genre={movie.genre}
                poster={movie.poster}
                onSave={() => saveMovie(movie)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}