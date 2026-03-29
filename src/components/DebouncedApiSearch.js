import React, { useState, useEffect } from "react";

export default function DebouncedApiSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  
  const handleSearchinput = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async() => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${searchTerm}`)
      const data = await res.json()
      setResults(data)
    } catch (error) {
      console.error("Search failed", error);
    }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  console.log("data",results)

  const MemoizedList = React.memo(({results})=>{
    return <ul>
        {results.map((item)=>{
         return <li key={item.id}>{item.title}</li>
        })}
      </ul>  })
  return (
    <div className="challenge-container">
      <h2>API Search (Debounced)</h2>
      <p>searchValue:{searchTerm}</p>
      <input
        type="text"
        placeholder="Search posts by title..."
        value={searchTerm}
        onChange={handleSearchinput}
        className="search-input"
      />
      {console.log("results rendered")}
  {results.length>0&& <MemoizedList results={results}/>}
    </div>
  );
}
