import React, { useState } from "react";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const LIMIT = 100;

  // DERIVED STATE: These are calculated every render based on 'text'
  // No need for extra useEffects or useStates!
  const currentCount = text.length;
  const isOverLimit = currentCount > LIMIT;
  const isWarning = currentCount >= 80 && currentCount <= LIMIT;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Determine the color class based on the count
  let statusClass = "";
  if (isOverLimit) statusClass = "error";
  else if (isWarning) statusClass = "warning";

  return (
    <div className="challenge-container characterCounter">
      <h2>Character Counter</h2>

      <textarea
        className={`text-input ${statusClass}`}
        value={text}
        onChange={handleChange}
        placeholder="What's on your mind?"
        rows="5"
      />

      <div className="footer">
        <span className={`counter ${statusClass}`}>
          {currentCount} / {LIMIT}
        </span>

        <button
          className="submit-btn"
          disabled={isOverLimit || currentCount === 0}
        >
          Post
        </button>
      </div>

      {isOverLimit && (
        <p className="error-msg">You have exceeded the character limit!</p>
      )}
    </div>
  );
}
