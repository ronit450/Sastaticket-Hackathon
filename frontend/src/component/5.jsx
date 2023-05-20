// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Score = () => {
//   const [score, setScore] = useState(null);

//   useEffect(() => {
//     const fetchScore = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/api/score');
//         const { score } = response.data;
//         console.log('Score:', score)
//         setScore(score);
//       } catch (error) {
//         console.error('Error fetching score:', error);
//       }
//     };

//     fetchScore();
//   }, []);

//   return (
//     <div>
//       {score !== null ? (
//         <p>Score: {score}</p>
//       ) : (
//         <p>Loading score...</p>
//       )}
//     </div>
//   );
// };

// export default Score;
