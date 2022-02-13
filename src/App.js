import { useContext } from "react";
import styled from "styled-components/macro";
import GameBoard from "./components/GameBoard";
import GameSettingsPanel from "./components/GameSettingsPanel";
import GameContext from "./store/game-context";

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
  return (
    <AppBackground gameStarted={gameCtx.gameState.gameState.started}>
      {!gameCtx.gameState.gameState.started && (
        <GameSettingsPanel onGameStartHandler={onGameStartHandler} />
      )}
      {gameCtx.gameState.gameState.started && <GameBoard />}
    </AppBackground>
  );
}

const AppBackground = styled.div`
  background-color: ${(p) =>
    p.gameStarted ? "var(--color-white)" : "var(--color-gray-blue-900)"};
  height: 100%;
`;
export default App;
