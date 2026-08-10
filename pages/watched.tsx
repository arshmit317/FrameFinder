import SavedMovieCard from "../components/SavedMovieCard";

export default function Watched() {
  return (
<div className="pageContainer">
     <main>
  <h2>Watched Movies</h2>

  <SavedMovieCard
    title="Interstellar"
    year={2014}
    genre="Science Fiction"
  />
      </main>
</div>
  );
}