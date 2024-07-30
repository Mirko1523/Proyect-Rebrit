import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [email, setEmail] = useState('');

  const search = () => {
    const trimmedEmail = email.trim();
    onSearch(trimmedEmail);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={email || ''}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Buscar por email"
        className="border p-2 w-full max-w-sm rounded"
      />
      <button
        onClick={search}
        className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-400"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
