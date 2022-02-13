import { createContext, useReducer } from "react";
import { createGamePieces } from "../gameData";
const initialState = {
  gameBoard: [],
  gameState: {
    started: false,
    piecesFlipped: 0,
    moves: 0,
  },
  config: {
    gridSize: 4,
    nbOfPlayers: 1,
    theme: "numbers",
  },
};
const GameContext = createContext(initialState);

const gameReducer = (state, action) => {
  if (action.type === "START") {
    const config = action.payload;
    const gameBoard = createGamePieces(config.gridSize, config.theme);
    return {
      gameBoard: gameBoard,
      gameState: {
        started: true,
        piecesFlipped: 0,
        moves: 0,
      },
      config: config,
    };
  }

  if (action.type === "END_GAME") {
    return initialState;
  }
  if (action.type === "FLIP_PIECE") {
    const gameBoard = structuredClone(state.gameBoard);
    const item = gameBoard.find((item) => item.id === action.payload.id);
    item.flipped = true;
    let piecesFlipped = +state.gameState.piecesFlipped + 1;
    return {
      gameBoard: gameBoard,
      gameState: {
        started: true,
        piecesFlipped: piecesFlipped,
        moves: state.gameState.moves,
      },
      config: state.config,
    };
  }

  if (action.type === "CHECK_GAME_STATE") {
    const gameBoard = structuredClone(state.gameBoard);
    let flippedItems = gameBoard.filter((item) => item.flipped === true);
    let moves = state.gameState.moves;
    if (flippedItems.length >= 2) {
      if (flippedItems[0].name === flippedItems[1].name) {
        flippedItems.forEach((item) => {
          item.matched = true;
        });
      }
      flippedItems.forEach((item) => {
        item.flipped = false;
      });
      moves += 1;
    }
    if (gameBoard.filter((i) => i.matched).length === gameBoard.length) {
      return {
        gameBoard: gameBoard,
        gameState: {
          started: false,
          piecesFlipped: state.gameState.piecesFlipped,
          moves: moves,
        },
        config: state.config,
      };
    }
    return {
      gameBoard: gameBoard,
      gameState: {
        started: true,
        piecesFlipped: state.gameState.piecesFlipped,
        moves: moves,
      },
      config: state.config,
    };
  }
  return {
    gameBoard: [],
    gameState: { started: false, piecesFlipped: 0, moves: 0 },
    config: {
      gridSize: 4,
      nbOfPlayers: 1,
      theme: "icons",
    },
  };
};

const GameContextProvider = ({ children }) => {
  const [gameState, dispatchGameState] = useReducer(gameReducer, {
    gameBoard: [],
    gameState: { started: false, piecesFlipped: 0, moves: 0 },
    config: {
      gridSize: 4,
      nbOfPlayers: 1,
      theme: "numbers",
    },
  });

  return (
    <GameContext.Provider
      value={{
        gameState: gameState,
        dispatchGameState: dispatchGameState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
export { GameContextProvider };
