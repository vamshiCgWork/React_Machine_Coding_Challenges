import React, { useState, useEffect } from "react";

export default function APIUserDirectory() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchUsers = async () => {
    // 1. Set loading to true and reset error
    // 2. Try to fetch the data
    // 3. Check if response is 'ok' (res.ok)
    // 4. Update users state
    // 5. Catch any errors
    // 6. Set loading to false
    try {
      setLoading(true); // Ensure loading starts on every refresh
      setError(null); // Clear previous errors
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) {
        throw new Error("failed to fetch data");
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  const handleSearch = (e) => {
    // everytime this function is causing re rendering
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error)
    return (
      <div>
        <h2>Oops! {error}</h2>
        <button onClick={fetchUsers}>Try Again</button>
      </div>
    );

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("vamshi");
  return (
    <div className="challenge-container">
      <div className="apifetching">
        <h2>User Directory</h2>
        <button onClick={fetchUsers}>Refresh Data</button>
        <div className="input">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <ul className="user-list">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li key={user.id} className="user-card">
                {user.name}
              </li>
            ))
          ) : (
            <p>No users found for "{searchTerm}"</p>
          )}
        </ul>
      </div>
    </div>
  );
}
