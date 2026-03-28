import React, { useState, useEffect } from "react";

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 1. Start a setInterval here
    // 2. Update the 'time' state every 1000ms
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    // 3. IMPORTANT: Return a cleanup function to clearInterval
    return () => clearInterval(timer);
  }, []);
  //console.log("value", time);
  return (
    <div className="challenge-container">
      <div className="clock-container">
        <h1>{time.toLocaleTimeString()}</h1>
      </div>
    </div>
  );
}
