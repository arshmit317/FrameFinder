type SavedMovieCardProps = {
  title: string;
  year: number;
  genre: string;
  onRemove: () => void; 
};

export default function SavedMovieCard({
  title,
  year,
  genre,
  onRemove,
}: SavedMovieCardProps) {
  return (
    <div className="movieCard">
      <h2>{title}</h2>

      <p>
        <strong>Year:</strong> {year}
      </p>

      <p>
        <strong>Genre:</strong> {genre}
      </p>

      <button onClick={onRemove}>Remove from Saved</button>
    </div>
  );
}