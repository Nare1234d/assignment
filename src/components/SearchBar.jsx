export default function SearchBar({ searchPath, setSearchPath }) {
  const handleSearch = () => {
    alert(`Searching for path: ${searchPath}`);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="e.g., user.address.city"
        value={searchPath}
        onChange={(e) => setSearchPath(e.target.value)}
        className="border rounded-md p-2 w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
}
