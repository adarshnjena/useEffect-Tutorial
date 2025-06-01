import React, { useState, useEffect } from 'react';

const CookingTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    console.log('useEffect ran - timer state changed');
    
    if (isRunning) {
      const id = setInterval(() => {
        setTime(prevTime => {
          console.log('Timer tick:', prevTime + 1);
          return prevTime + 1;
        });
      }, 1000);
      
      setIntervalId(id);
      
      return () => {
        console.log('Cleaning up interval');
        clearInterval(id);
      };
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(prevState => !prevState);
  };

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
