type SavedMovieCardProps = {
  title: string;
  year: number;
  genre: string;
};

export default function SavedMovieCard({
  title,
  year,
  genre,
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

      <button>Remove from Saved</button>
    </div>
  );
}