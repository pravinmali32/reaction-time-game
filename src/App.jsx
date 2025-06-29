import { useState } from 'react';
import './index.css';

function App() {
  // State variables to manage game logic
  const [gameStarted, setGameStarted] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);

  // Start the game when button is clicked
  const startGame = () => {
    setGameStarted(true);
    setWaiting(true);
    setReactionTime(null);

    // Wait 2–5 seconds before turning green
    setTimeout(() => {
      setStartTime(Date.now());
      setWaiting(false);
    }, Math.random() * 3000 + 2000);
  };

  // When user clicks the box
  const handleClick = () => {
    if (!gameStarted) return;

    if (waiting) {
      alert('Too soon! Wait for green');
      resetGame();
    } else {
      const rt = Date.now() - startTime;
      setReactionTime(rt);
      setGameStarted(false);
    }
  };

  // Reset all state
  const resetGame = () => {
    setGameStarted(false);
    setWaiting(false);
    setStartTime(null);
  };

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
          <h1>Reaction Time Game</h1>

      <div
        onClick={handleClick}
        style={{
          width: '300px',
          height: '200px',
          backgroundColor: waiting ? 'red' : gameStarted ? 'green' : '#ccc',
          margin: '20px auto',
          lineHeight: '200px',
          color: 'white',
          fontSize: '24px',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      >
        {waiting ? 'Wait...' : gameStarted ? 'CLICK!' : 'Start'}
      </div>

      {!gameStarted && (
        <button onClick={startGame} style={{ fontSize: '18px' }}>
          Start Game
        </button>
      )}

      {reactionTime && (
        <p>
          Your reaction time: <strong>{reactionTime} ms</strong>
        </p>
      )}
    </div>
  );
}

export default App;
