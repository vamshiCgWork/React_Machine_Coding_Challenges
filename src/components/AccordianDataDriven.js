import React, { useState } from "react";

const accordionData = [
  {
    id: 1,
    title: "What is React?",
    content: "A JavaScript library for building UIs.",
  },
  {
    id: 2,
    title: "Why use Hooks?",
    content: "To use state and lifecycle features in functional components.",
  },
  {
    id: 3,
    title: "What is JSX?",
    content: "A syntax extension for JavaScript that looks like HTML.",
  },
];

export default function Accordion() {
  // Hint: You only need ONE state variable to track which ID is open.
  const [openId, setOpenId] = useState(null);

  const handleToggle = (e) => {
    // Access the ID from the data-id attribute
    // Note: data-attributes are strings, so we convert to Number
    const clickedId = Number(e.currentTarget.dataset.id);
    console.log("value:", e.currentTarget);
    setOpenId((prev) => (prev === clickedId ? null : clickedId));
  };

  return (
    <div className="challenge-container">
      <h2>Accordian</h2>
      <div className="accordion">
        {accordionData.map((item) => (
          <div key={item.id} className="accordion-item">
            <div
              className="accordion-header"
              data-id={item.id}
              data-value={item.id}
              onClick={handleToggle}
            >
              <h3>{item.title}</h3>
              <span>{openId === item.id ? "-" : "+"}</span>
            </div>

            {/* Show this div only if this item's ID is the openId */}
            {openId == item.id && (
              <div className="accordion-content">{item.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
