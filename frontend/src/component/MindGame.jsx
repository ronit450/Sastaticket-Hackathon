import { useState, useEffect } from "react";
import "./MindGame.css";
import SingleCard from "./SingleCard";
import axios from "axios";


// import helmetImage from "../assets/helmet-1.png";
import Passport from "../assets/Passport.png";
import potionImage from "../assets/potion-1.png";
import ringImage from "../assets/ring-1.png";
import scrollImage from "../assets/scroll-1.png";
import shieldImage from "../assets/shield-1.png";
import swordImage from "../assets/sword-1.png";

const cardImages = [
  { src: Passport, matched: false },
  { src: potionImage, matched: false },
  { src: ringImage, matched: false },
  { src: scrollImage, matched: false },
  { src: shieldImage, matched: false },
  { src: swordImage, matched: false },
];

function MindGame() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };




  const uploadTurns = async (turns) => {
    try {
      await axios.post('http://127.0.0.1:5000/api/turns', { turns });
      console.log('Turns uploaded successfully!');
    } catch (error) {
      console.error('Error uploading turns:', error);
    }
  };


  // handle a choice
  const handleChoice = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }

    }

  }, [choiceOne, choiceTwo]);



  useEffect(() => {
  if (cards.every((card) => card.matched)) {
    console.log("Game Over");
    console.log(turns);
    uploadTurns(turns);
  }
  }, [cards, turns]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };


  // start new game automagically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p className="turns">Turns: {turns}</p>
    </div>
  );
}

export default MindGame;
