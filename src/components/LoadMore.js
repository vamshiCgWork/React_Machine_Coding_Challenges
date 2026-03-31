import React, { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network Response was not ok");
        return response.json();
      })
      .then((userData) => setData(userData))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, isLoading, error };
}
export default function LoadMoreFeed() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`;
  const { data, isLoading, error } = useFetch(url);

  // const fetchData = async () => {
  //   if (page == 0) {
  //     return;
  //   }
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch(
  //       `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  //     );
  //     const newData = await res.json();
  //     console.log("new data", newData);
  //     setItems((prev) => [...prev, ...newData]);
  //   } catch (error) {
  //     console.error("Fetch failed", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [page]);

  useEffect(() => {
    if (data) setItems((prev) => [...prev, ...data]);
  }, [data]);
  console.log("url", url);
  console.log("data", data);
  console.log("items", items);
  console.log("pages", page);
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
        <button
          className="load-more-btn"
          disabled={isLoading}
          onClick={() => {
            setPage((prev) => prev + 1);
            // refetch();
          }}
        >
          {isLoading ? "Fetching..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
