type MovieCardProps = {
  id: number;
  title: string;
  year: number;
  genre: string;
};

export default function MovieCard({
  title,
  year,
  genre,
}: MovieCardProps) {
  return (
    <div className="movieCard">
      <h2>{title}</h2>

      <p>
        <strong>Year:</strong> {year}
      </p>

      <p>
        <strong>Genre:</strong> {genre}
      </p>

      <button>Add to Saved</button>
    </div>
  );
}