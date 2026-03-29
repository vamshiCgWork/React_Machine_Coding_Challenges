import React, { useState, useEffect } from "react";

export default function LoadMoreFeed() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (page == 0) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const newData = await res.json();
      console.log("new data", newData);
      setItems((prev) => [...prev, ...newData]);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);
  console.log("items", items);
  return (
    <div className="challenge-container">
      <div className="postCard">
        <h2>Infinite Feed</h2>

        <ul className="feed-list">
          {items.map((item) => (
            <li key={item.id} className="post-card">
              <span className="post-id">{item.id}</span>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ul>

        {isLoading && <p>Loading more posts...</p>}

        {/* ✅ CHALLENGE: Create a button that increments the 'page' state */}
        <button
          className="load-more-btn"
          disabled={isLoading}
          onClick={() => setPage((prev) => prev + 1)}
        >
          {isLoading ? "Fetching..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
