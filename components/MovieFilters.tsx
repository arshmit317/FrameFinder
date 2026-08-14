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
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          marginRight: "10px",
          color: "white",
        }}
      >
        <option value="" style={{ color: "black" }}>All Genres</option>
        <option value="Science Fiction" style={{ color: "black" }}>Science Fiction</option>
        <option value="Action" style={{ color: "black" }}>Action</option>
        <option value="Comedy" style={{ color: "black" }}>Comedy</option>
      </select>

      <input
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          marginRight: "10px",
        }}
      />

      <input
      type="number"
        placeholder="Minimum Rating"
        min="0"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={{
          width: "150px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
        }}
      />
    </div>
  );
}