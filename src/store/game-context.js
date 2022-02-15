import { createContext, useReducer } from "react";
import { createGamePieces, createPlayers } from "../gameData";
export const NotStarted = Symbol("notStarted");
export const Started = Symbol("started");
export const Ended = Symbol("ended");

const initialState = {
  gameBoard: [],
  gameState: {
    status: NotStarted,
    piecesFlipped: 0,
    moves: 0,
    currentPlayerId: null,
  },
  config: {
    gridSize: 4,
    nbOfPlayers: 1,
    theme: "numbers",
  },
  playersScore: [],
};
const GameContext = createContext(initialState);

const gameReducer = (state, action) => {
  if (action.type === "START") {
    const config = action.payload;
    const gameBoard = createGamePieces(config.gridSize, config.theme);
    const playersScore = createPlayers(config.nbOfPlayers);
    const currentPlayerId = playersScore[0].id;
    return {
      gameBoard: gameBoard,
      gameState: {
        status: Started,
        piecesFlipped: 0,
        moves: 0,
      },
      config: config,
      playersScore: playersScore,
      currentPlayerId: currentPlayerId,
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
        status: Started,
        piecesFlipped: piecesFlipped,
        moves: state.gameState.moves,
      },
      config: state.config,
      playersScore: state.playersScore,
      currentPlayerId: state.currentPlayerId,
    };
  }

  if (action.type === "CHECK_GAME_STATE") {
    const gameBoard = structuredClone(state.gameBoard);
    const playersScore = structuredClone(state.playersScore);
    let currentPlayerId = state.currentPlayerId;
    let flippedItems = gameBoard.filter((item) => item.flipped === true);
    let moves = state.gameState.moves;
    if (flippedItems.length >= 2) {
      let addMatchedPairs = 0;
      if (flippedItems[0].name === flippedItems[1].name) {
        flippedItems.forEach((item) => {
          item.matched = true;
        });
        addMatchedPairs += 1;
      }
      flippedItems.forEach((item) => {
        item.flipped = false;
      });
      const currentPlayerIndex = playersScore.findIndex(
        (p) => p.id === currentPlayerId
      );
      playersScore[currentPlayerIndex].moves += 1;
      playersScore[currentPlayerIndex].matchedPairs += addMatchedPairs;
      let nextPlayerIndex = currentPlayerIndex + 1;
      if (nextPlayerIndex >= playersScore.length) {
        nextPlayerIndex = 0;
      }
      currentPlayerId = playersScore[nextPlayerIndex].id;
      moves += 1;
    }
    // Game Ended
    if (gameBoard.filter((i) => i.matched).length === gameBoard.length) {
      playersScore.sort((a, b) => b.matchedPairs - a.matchedPairs);
      let highestScore = playersScore[0].matchedPairs;
      for (const playerScore of playersScore) {
        if (playerScore.matchedPairs === highestScore) {
          playerScore.winner = true;
        }
      }
      return {
        gameBoard: gameBoard,
        gameState: {
          status: Ended,
          piecesFlipped: state.gameState.piecesFlipped,
          moves: moves,
        },
        config: state.config,
        playersScore: playersScore,
        currentPlayerId: currentPlayerId,
      };
    }
    return {
      gameBoard: gameBoard,
      gameState: {
        status: Started,
        piecesFlipped: state.gameState.piecesFlipped,
        moves: moves,
      },
      config: state.config,
      playersScore: playersScore,
      currentPlayerId: currentPlayerId,
    };
  }
  return state;
};

const GameContextProvider = ({ children }) => {
  const [gameState, dispatchGameState] = useReducer(gameReducer, {
    gameBoard: [],
    gameState: {
      piecesFlipped: 0,
      moves: 0,
      status: NotStarted,
    },
    config: {
      gridSize: 4,
      nbOfPlayers: 1,
      theme: "numbers",
    },
    playersScore: [],
    currentPlayerId: null,
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
