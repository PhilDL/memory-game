import styled from "styled-components/macro";
import { useContext, useEffect, useState, useCallback } from "react";
import GamePiece from "./GamePiece";
import GameBoardFooter from "./GameBoardFooter";
import GameContext, { Started, Ended } from "../store/game-context";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";
import EndScreen from "./EndScreen";
import MobileMenu from "./MobileMenu";
import { QUERIES } from "../constants";

const GameBoard = () => {
  const gameCtx = useContext(GameContext);
  const [seconds, setSeconds] = useState(0);
  const [showEndScreen, setShowEndscreen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  let started = gameCtx.gameState.gameState.status === Started;
  const piecesFlipped = gameCtx.gameState.gameState.piecesFlipped;
  const dispatchGameState = gameCtx.dispatchGameState;
  const gameBoard = gameCtx.gameState.gameBoard;

  useEffect(() => {
    if (gameCtx.gameState.gameState.status !== Ended) {
      return;
    }
    setShowEndscreen(true);
  }, [gameCtx.gameState.gameState.status]);

  useEffect(() => {
    if (piecesFlipped <= 0) {
      return;
    }
    const checkGameStateTimeoutIdentifier = setTimeout(() => {
      console.log("check game state");
      dispatchGameState({
        type: "CHECK_GAME_STATE",
      });
    }, 200);
    return () => {
      clearTimeout(checkGameStateTimeoutIdentifier);
    };
  }, [piecesFlipped, dispatchGameState]);

  useEffect(() => {
    let interval = null;
    if (started) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!started && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [started, seconds]);

  const flipPieceHandler = useCallback(
    (piece) => {
      if (piece.flipped || piece.matched) {
        return;
      }
      dispatchGameState({
        type: "FLIP_PIECE",
        payload: { id: piece.id },
      });
    },
    [dispatchGameState]
  );

  const restartGameHandler = () => {
    setShowEndscreen(false);
    setShowMobileMenu(false);
    dispatchGameState({
      type: "START",
      payload: gameCtx.gameState.config,
    });
    setSeconds(0);
  };

  const newGameHandler = () => {
    setShowEndscreen(false);
    setShowMobileMenu(false);
    dispatchGameState({
      type: "END_GAME",
    });
  };

  const dismissEndScreen = () => {
    setShowEndscreen(false);
    setShowMobileMenu(false);
    dispatchGameState({
      type: "END_GAME",
    });
  };

  let timeElapsed = new Date(1000 * seconds).toISOString().substr(14, 5);

  return (
    <Wrapper>
      <Header>
        <Logo>memory</Logo>
        <Navigation>
          <RestartButton onClick={restartGameHandler}>Restart</RestartButton>
          <NewGameButton onClick={newGameHandler}>New Game</NewGameButton>
          <MenuButton onClick={() => setShowMobileMenu(true)}>Menu</MenuButton>
        </Navigation>
      </Header>
      <Main>
        <GameBoardWrapper gridSize={gameCtx.gameState.config.gridSize}>
          {gameBoard.map((piece) => (
            <GamePiece
              key={piece.id}
              onFlipPiece={flipPieceHandler.bind(this, piece)}
              piece={piece}
              config={gameCtx.gameState.config}
            />
          ))}
        </GameBoardWrapper>
      </Main>
      <GameBoardFooter
        playersScore={gameCtx.gameState.playersScore}
        currentPlayerId={gameCtx.gameState.currentPlayerId}
        totalMoves={gameCtx.gameState.gameState.moves}
        timeElapsed={timeElapsed}
      />
      <EndScreen
        moves={gameCtx.gameState.gameState.moves}
        timeElapsed={timeElapsed}
        isOpen={showEndScreen}
        onDismiss={dismissEndScreen}
        onRestart={restartGameHandler}
        onNewgame={newGameHandler}
        playersScore={gameCtx.gameState.playersScore}
      />
      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
        onRestart={restartGameHandler}
        onNewgame={newGameHandler}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--color-white);
  margin: auto;
  max-width: 1110px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  padding: 24px;
`;

const Main = styled.main`
  width: auto;
  margin: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
const Logo = styled.h1`
  margin-right: auto;
  color: var(--color-gray-blue-900);
  font-size: var(--font-size-nav-logo);
`;
const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const RestartButton = styled(PrimaryButton)`
  display: none;
  @media ${QUERIES.tabletAndUp} {
    display: revert;
  }
`;

const NewGameButton = styled(SecondaryButton)`
  display: none;
  @media ${QUERIES.tabletAndUp} {
    display: revert;
  }
`;

const MenuButton = styled(PrimaryButton)`
  @media ${QUERIES.tabletAndUp} {
    display: none;
  }
`;

const GameBoardWrapper = styled.section`
  display: grid;
  grid-template-columns: var(--gameboard-${(p) => p.gridSize}-layout);
  gap: var(--gameboard-${(p) => p.gridSize}-gap);
  width: min-content;
  margin: auto;
`;

export default GameBoard;
