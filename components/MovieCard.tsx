type MovieCardProps = {
  id: number;
  title: string;
  year: number;
  genre: string;
  onSave: () => void;
};

export default function MovieCard({
  title,
  year,
  genre,
  onSave,
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

    <button onClick={onSave}>Add to Saved</button>    </div>
  );
}