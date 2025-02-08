import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
function getRandomValue() {
  return Math.floor(Math.random() * 6) + 1;
}

function explosionConfetti() {
  const count = 500;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

function checkDice(dices) {
  return (
    dices.every((dice) => dice.value === dices[0].value) &&
    dices.every((dice) => dice.isFreezed)
  );
}

const dices = [
  { id: 1, isFreezed: false, value: getRandomValue() },
  { id: 2, isFreezed: false, value: getRandomValue() },
  { id: 3, isFreezed: false, value: getRandomValue() },
  { id: 4, isFreezed: false, value: getRandomValue() },
  { id: 5, isFreezed: false, value: getRandomValue() },
  { id: 6, isFreezed: false, value: getRandomValue() },
  { id: 7, isFreezed: false, value: getRandomValue() },
  { id: 8, isFreezed: false, value: getRandomValue() },
  { id: 9, isFreezed: false, value: getRandomValue() },
  { id: 10, isFreezed: false, value: getRandomValue() },
];

function App() {
  const [dicesAll, setDicesAll] = useState(dices);
  function toggleDice(id) {
    setDicesAll((prevDices) =>
      prevDices.map((dice) =>
        dice.id === id ? { ...dice, isFreezed: !dice.isFreezed } : dice
      )
    );
  }

  function rollDice() {
    setDicesAll((prevDices) => {
      return prevDices.map((dice) =>
        dice.isFreezed === false ? { ...dice, value: getRandomValue() } : dice
      );
    });
  }

  function resetGame() {
    setDicesAll((prevDices) => {
      return prevDices.map((dice) => ({
        ...dice,
        value: getRandomValue(),
        isFreezed: false,
      }));
    });
  }

  if (checkDice(dicesAll)) {
    explosionConfetti();
  }

  return (
    <>
      <main>
        <h1>Tenzi</h1>
        <p>
          Roll until all dices are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <section>
          {dicesAll.map((dice) => (
            <div
              key={dice.id}
              className={`item ${dice.isFreezed ? "isFreezed" : ""}`}
            >
              <img
                onClick={() => toggleDice(dice.id)}
                src={`./${dice.value}.png`}
                alt={dice.value}
              />
            </div>
          ))}
        </section>
        {!checkDice(dicesAll) ? (
          <button onClick={rollDice}>Roll dice</button>
        ) : (
          <button
            onClick={() => {
              resetGame();
            }}
          >
            New game
          </button>
        )}
      </main>
    </>
  );
}
export default App;
