import React, { useState, useEffect } from "react";
import "./ReactionTimeGame.css";

const ReactionTimeGame = () => {
  const gridSize = 3; // Grid size set to 3x3
  const totalGameTime = 30000; // Total game time in milliseconds (30 seconds)
  const boxClickPenalty = 2000; // Penalty time in milliseconds for missed clicks
  const [redDotIndex, setRedDotIndex] = useState(-1);
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [missedTime, setMissedTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setGameOver(true);
    }, totalGameTime);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const timeout = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * gridSize * gridSize);
        setRedDotIndex(randomIndex);
        setStartTime(Date.now());
        setMissedTime((prevMissedTime) => prevMissedTime + boxClickPenalty);
      }, getRandomDelay());

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [redDotIndex, gameOver]);

  

  const handleBoxClick = (index) => {
    if (index === redDotIndex) {
      const endTime = Date.now();
      const currentReactionTime = endTime - startTime;
      setReactionTime((prevReactionTime) => prevReactionTime + currentReactionTime);
      setRedDotIndex(-1);
    } else {
      setMissedTime((prevMissedTime) => prevMissedTime + boxClickPenalty);
    }
  };

  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      boxes.push(
        <div
          key={i}
          className={`box ${i === redDotIndex ? "red-dot" : ""}`}
          onClick={() => handleBoxClick(i)}
        ></div>
      );
    }
    return boxes;
  };

  const getRandomDelay = () => {
    return Math.floor(Math.random() * 3000) + 1000; // Random delay between 1 and 4 seconds
  };

  const getFormattedTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    return `${seconds}.${milliseconds} s`;
  };

  return (
    <div className="container">
      <h1>Reaction Time Game</h1>
      {gameOver ? (
        <div>
          <p className="game-over">Game Over!</p>
          <p className="total-time">
            Total time: {getFormattedTime(reactionTime + missedTime)}
          </p>
        </div>
      ) : (
        <div>
          <div className={`grid-container grid-${gridSize}`}>{renderBoxes()}</div>
          {reactionTime > 0 && (
            <p className="reaction-time">Your reaction time: {getFormattedTime(reactionTime)}s</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReactionTimeGame;


// import React, { useState, useEffect } from "react";
// import "./ReactionTimeGame.css";

// const ReactionTimeGame = () => {
//   const gridSize = 3; // Grid size set to 3x3
//   const totalGameTime = 30000; // Total game time in milliseconds (30 seconds)
//   const boxClickPenalty = 2000; // Penalty time in milliseconds for missed clicks
//   const [redDotIndex, setRedDotIndex] = useState(-1);
//   const [startTime, setStartTime] = useState(0);
//   const [reactionTime, setReactionTime] = useState(0);
//   const [missedTime, setMissedTime] = useState(0);
//   const [gameOver, setGameOver] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setGameOver(true);
//     }, totalGameTime);

//     return () => {
//       clearTimeout(timeout);
//     };
//   }, []);

//   useEffect(() => {
//     if (!gameOver) {
//       const timeout = setTimeout(() => {
//         const randomIndex = Math.floor(Math.random() * gridSize * gridSize);
//         setRedDotIndex(randomIndex);
//         setStartTime(Date.now());
//         setMissedTime((prevMissedTime) => prevMissedTime + boxClickPenalty);
//       }, getRandomDelay());

//       return () => {
//         clearTimeout(timeout);
//       };
//     }
//   }, [redDotIndex, gameOver]);

//   const handleBoxClick = (index) => {
//     if (index === redDotIndex) {
//       const endTime = Date.now();
//       const currentReactionTime = endTime - startTime;
//       setReactionTime(
//         (prevReactionTime) => prevReactionTime + currentReactionTime
//       );
//       setRedDotIndex(-1);
//     } else {
//       setMissedTime((prevMissedTime) => prevMissedTime + boxClickPenalty);
//     }
//   };

//   const renderBoxes = () => {
//     const boxes = [];
//     for (let i = 0; i < gridSize * gridSize; i++) {
//       boxes.push(
//         <div
//           key={i}
//           className={`box ${i === redDotIndex ? "red-dot" : ""}`}
//           onClick={() => handleBoxClick(i)}
//         ></div>
//       );
//     }
//     return boxes;
//   };

//   const getRandomDelay = () => {
//     return Math.floor(Math.random() * 3000) + 1000; // Random delay between 1 and 4 seconds
//   };

//   const getFormattedTime = (time) => {
//     const seconds = Math.floor(time / 1000);
//     const milliseconds = time % 1000;
//     return `${seconds}.${milliseconds} s`;
//   };

//   return (
//     <div className="container">
//       <h1>Reaction Time Game</h1>
//       {gameOver ? (
//         <div>
//           <p className="game-over">Game Over!</p>
//           <p className="total-time">
//             Total time: {getFormattedTime(reactionTime + missedTime)} (Reaction
//             time: {getFormattedTime(reactionTime)})
//           </p>
//         </div>
//       ) : (
//         <div>
//           <div className={`grid-container grid-${gridSize}`}>
//             {renderBoxes()}
//           </div>
//           {reactionTime > 0 && (
//             <p className="reaction-time">
//               Your reaction time: {getFormattedTime(reactionTime)}s
//             </p>
//           )}
//         </div>
//       )}  
//     </div>
//   );
// };

// export default ReactionTimeGame;

