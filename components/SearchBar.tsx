type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: Props) {
  return (
    <input
      className="searchBar"
      type="text"
      placeholder="Search for a movie..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}