

import { useState } from "react";
import Square from "../Components/Square";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return null;
  };

  const checkDraw = () => {
    return state.every(square => square !== null);
  };

  const winner = checkWinner();
  const isDraw = !winner && checkDraw();

  const handleClick = (index) => {
    if (state[index] || winner || isDraw || !isGameStarted) {
      return;
    }
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    setState(copyState);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setState(Array(9).fill(null));
    setIsXTurn(true);
    setIsGameStarted(false);
    setPlayer1("");
    setPlayer2("");
  };

  const startGame = () => {
    if (player1 && player2) {
      setIsGameStarted(true);
    }
  };

  return (
    <div className="board-container">
      {!isGameStarted ? (
        <div className="start-game shadow-lg p-5">
        <h5>X and O</h5>
        <h5 className="mb-3">Please Enter Details </h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter Player 2 Name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
          <button className="btn btn-primary" onClick={startGame}>
            Start Game
          </button>
        </div>
      ) : (
        <>
          {winner || isDraw ? (
            <div className="message">
              {winner ? `${winner === "X" ? player1 : player2} WON the game` : "It's a DRAW!"} <br/>
              <button className="btn btn-primary mt-3" onClick={resetGame}>Play Again</button>
            </div>
          ) : (
            <>
              <div className="message bg-white p-2 shadow-sm rounded">{isXTurn ? `${player1}, its your turn` : `${player2}, its your turn`}</div>
              <div className="board-wrapper">
                <div className="board-grid">
                  {state.map((value, index) => (
                    <Square key={index} onClick={() => handleClick(index)} value={value} />
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Board;
