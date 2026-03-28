import React, { useState, useEffect } from "react";

export default function DebouncedApiSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const handleSearchinput = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {});
  return (
    <div className="challenge-container">
      <h2>API Search (Debounced)</h2>
      <p>searchValue:{searchTerm}</p>
      <p>debouncevalue:{debounceValue}</p>
      <input
        type="text"
        placeholder="Search posts by title..."
        value={searchTerm}
        onChange={handleSearchinput}
        className="search-input"
      />
    </div>
  );
}
