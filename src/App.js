import { useContext } from "react";
import styled from "styled-components/macro";
import GameBoard from "./components/GameBoard";
import GameSettingsPanel from "./components/GameSettingsPanel";
import GameContext, { Started, Ended, NotStarted } from "./store/game-context";

function App() {
  const gameCtx = useContext(GameContext);

  const onGameStartHandler = ({ theme, nbOfPlayers, gridSize }) => {
    gameCtx.dispatchGameState({
      type: "START",
      payload: {
        theme: theme,
        nbOfPlayers: +nbOfPlayers,
        gridSize: +gridSize,
      },
    });
  };
  let gameStatus = gameCtx.gameState.gameState.status;
  return (
    <AppBackground gameStarted={gameStatus === Started || gameStatus === Ended}>
      {gameStatus === NotStarted && (
        <GameSettingsPanel onGameStartHandler={onGameStartHandler} />
      )}
      {(gameStatus === Started || gameStatus === Ended) && <GameBoard />}
    </AppBackground>
  );
}

const AppBackground = styled.div`
  background-color: ${(p) =>
    p.gameStarted ? "var(--color-white)" : "var(--color-gray-blue-900)"};
  height: 100%;
`;
export default App;
