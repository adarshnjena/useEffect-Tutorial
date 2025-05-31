import React, { useState, useEffect } from 'react';

/**
 * A cooking timer component that demonstrates the useEffect hook in React.
 * This component shows how to manage side effects like timers in functional components.
 */
const CookingTimer = () => {
  // State to track if the timer is running
  const [isRunning, setIsRunning] = useState(false);
  // State to track the elapsed time in seconds
  const [time, setTime] = useState(0);
  // State to store the interval ID for cleanup
  const [intervalId, setIntervalId] = useState(null);

  // Effect to handle the timer logic
  useEffect(() => {
    console.log('useEffect ran - timer state changed');
    
    if (isRunning) {
      // Set up the interval when the timer is running
      const id = setInterval(() => {
        setTime(prevTime => {
          console.log('Timer tick:', prevTime + 1);
          return prevTime + 1;
        });
      }, 1000);
      
      // Save the interval ID for cleanup
      setIntervalId(id);
      
      // Cleanup function - runs when component unmounts or before re-running the effect
      return () => {
        console.log('Cleaning up interval');
        clearInterval(id);
      };
    } else if (intervalId) {
      // Clean up the interval when the timer is stopped
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isRunning]); // Only re-run the effect if isRunning changes

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle the timer on/off
  const toggleTimer = () => {
    setIsRunning(prevState => !prevState);
  };

  // Reset the timer to 0
  const resetTimer = () => {
    setTime(0);
    if (isRunning) {
      setIsRunning(false);
    }
  };

  return (
    <div className="cooking-timer">
      <h2>🍳 Cooking Timer</h2>
      <div className="timer-display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={toggleTimer}>
          {isRunning ? '⏸️ Pause' : '▶️ Start'}
        </button>
        <button onClick={resetTimer} disabled={time === 0}>
          🔄 Reset
        </button>
      </div>
      <div className="explanation">
        <h3>How useEffect works in this component:</h3>
        <ol>
          <li>When the component mounts, the effect runs once</li>
          <li>When you click 'Start', it sets up an interval that updates the time every second</li>
          <li>When you click 'Pause', it clears the interval</li>
          <li>When the component unmounts, the cleanup function runs to clear any active intervals</li>
        </ol>
        <p>Check the browser's console to see the effect in action!</p>
      </div>
    </div>
  );
};

export default CookingTimer;
