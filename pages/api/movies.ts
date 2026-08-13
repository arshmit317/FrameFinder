import type { NextApiRequest, NextApiResponse } from "next";

type TmdbMovie = {
  id: number;
  title: string;
  release_date?: string;
  genre_ids?: number[];
  vote_average?: number;
  poster_path?: string | null;
  overview?: string;
  genres?: { name: string }[];
};

const genreNames: Record<number, string> = {
  12: "Adventure",
  14: "Fantasy",
  16: "Animation",
  18: "Drama",
  27: "Horror",
  28: "Action",
  35: "Comedy",
  53: "Thriller",
  80: "Crime",
  878: "Science Fiction",
  9648: "Mystery",
  10749: "Romance",
  10751: "Family",
};

const genreIds: Record<string, string> = {
  Adventure: "12",
  Fantasy: "14",
  Animation: "16",
  Drama: "18",
  Horror: "27",
  Action: "28",
  Comedy: "35",
  Thriller: "53",
  Crime: "80",
  "Science Fiction": "878",
  Mystery: "9648",
  Romance: "10749",
  Family: "10751",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get one movie for the View Details page
  if (typeof req.query.id === "string") {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${req.query.id}` +
      `?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );

    if (!response.ok) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    const movie: TmdbMovie = await response.json();

    return res.status(200).json({
      id: movie.id,
      title: movie.title,
      year: Number(movie.release_date?.substring(0, 4)),
      genre:
        movie.genres?.map((genre) => genre.name).join(", ") ||
        "Unknown",
      rating: movie.vote_average ?? 0,
      overview:
        movie.overview || "No description available.",
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
    });
  }

  const searchTerm =
    typeof req.query.search === "string"
      ? req.query.search
      : "";

  const genre =
    typeof req.query.genre === "string"
      ? req.query.genre
      : "";

  const year =
    typeof req.query.year === "string"
      ? req.query.year
      : "";

  const rating =
    typeof req.query.rating === "string"
      ? req.query.rating
      : "";

  const endpoint = searchTerm
    ? "search/movie"
    : "discover/movie";

  const parameters = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY || "",
    language: "en-US",
    include_adult: "false",
  });

  if (searchTerm) {
    parameters.set("query", searchTerm);
  } else {
    parameters.set("sort_by", "popularity.desc");

    if (genre && genreIds[genre]) {
      parameters.set("with_genres", genreIds[genre]);
    }

    if (rating) {
      parameters.set("vote_average.gte", rating);
    }
  }

  if (year) {
    parameters.set("primary_release_year", year);
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/${endpoint}?${parameters}`
  );

  const data = await response.json();

  let results: TmdbMovie[] = data.results || [];

  // Search/movie does not directly support these two filters
  if (searchTerm && genre && genreIds[genre]) {
    results = results.filter((movie) =>
      movie.genre_ids?.includes(Number(genreIds[genre]))
    );
  }

  if (searchTerm && rating) {
    results = results.filter(
      (movie) =>
        (movie.vote_average ?? 0) >= Number(rating)
    );
  }

  const movies = results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    year: Number(movie.release_date?.substring(0, 4)),
    genre:
      movie.genre_ids
        ?.map((id) => genreNames[id])
        .filter(Boolean)
        .join(", ") || "Unknown",
    rating: movie.vote_average ?? 0,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "",
  }));

  return res.status(200).json(movies);
}