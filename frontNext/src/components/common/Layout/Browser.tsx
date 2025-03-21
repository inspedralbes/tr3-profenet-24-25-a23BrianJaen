
interface BrowserProps {
  searchTerm: string;
  handleSearch: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

export default function Browser({ searchTerm, handleSearch, setCurrentPage }: BrowserProps) {
  return (
    <div className="relative group">
      <input
        className="border border-gray-300 rounded-md p-2"
        type="text"
        placeholder="Introdueix un nom"
        value={searchTerm}
        onChange={(e) => {
          handleSearch(e.target.value);
          setCurrentPage(1);
        }}
      />
      <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-md px-2 py-1 -bottom-8 right-0 whitespace-nowrap">
        Cerca un professor pel seu nom
      </div>
    </div>
  );
}