type Props = {
  genre: string;
  setGenre: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  rating: string;
  setRating: (value: string) => void;
};

export default function MovieFilters({
  genre,
  setGenre,
  year,
  setYear,
  rating,
  setRating,
}: Props) {
  return (
    <div className="movieFilters">
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
      </select>

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <input
        type="number"
        placeholder="Minimum Rating"
        min="0"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
    </div>
  );
}