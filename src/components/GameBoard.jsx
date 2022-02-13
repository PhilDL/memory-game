import styled from "styled-components/macro";
import React, { useContext, useEffect, useState } from "react";
import UnstyledButton from "./UnstyledButton";
import GamePiece from "./GamePiece";
import GameContext from "../store/game-context";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";

const GameBoard = () => {
  const gameCtx = useContext(GameContext);
  const [seconds, setSeconds] = useState(0);
  let started = gameCtx.gameState.gameState.started;

  useEffect(() => {
    if (gameCtx.gameState.gameState.piecesFlipped <= 0) {
      return;
    }
    const checkGameStateTimeoutIdentifier = setTimeout(() => {
      gameCtx.dispatchGameState({
        type: "CHECK_GAME_STATE",
      });
    }, 200);
    return () => {
      clearTimeout(checkGameStateTimeoutIdentifier);
    };
  }, [gameCtx.gameState.gameState.piecesFlipped]);

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

  const gameBoard = gameCtx.gameState.gameBoard;

  const flipPieceHandler = (piece) => {
    if (piece.flipped || piece.matched) {
      return;
    }
    gameCtx.dispatchGameState({
      type: "FLIP_PIECE",
      payload: { id: piece.id },
    });
  };

  const restartGameHandler = () => {
    console.log("restartGameHandler");
    gameCtx.dispatchGameState({
      type: "START",
      payload: gameCtx.gameState.config,
    });
  };

  const newGameHandler = () => {
    gameCtx.dispatchGameState({
      type: "END_GAME",
    });
  };

  let timeElapsed = new Date(1000 * seconds).toISOString().substr(11, 8);

  return (
    <Wrapper>
      <Header>
        <Logo>memory</Logo>
        <Navigation>
          <PrimaryButton onClick={restartGameHandler}>Restart</PrimaryButton>
          <SecondaryButton onClick={newGameHandler}>New Game</SecondaryButton>
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
      <Footer>
        <InfoBox>
          <InfoLabel>Time</InfoLabel>
          <InfoValue>{timeElapsed}</InfoValue>
        </InfoBox>
        <InfoBox>
          <InfoLabel>Moves</InfoLabel>
          <InfoValue>{gameCtx.gameState.gameState.moves}</InfoValue>
        </InfoBox>
      </Footer>
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
`;

const Main = styled.main`
  width: 600px;
  margin: auto;
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
  font-size: var(--font-size-h1);
  font-weight: 700;
`;
const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const GameBoardWrapper = styled.section`
  display: grid;
  grid-template-columns: var(--gameboard-${(p) => p.gridSize}-layout);
  gap: var(--gameboard-${(p) => p.gridSize}-gap);
  width: min-content;
  margin: auto;
`;

const Footer = styled.footer`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex: 1;
`;

const InfoBox = styled.div`
  background-color: var(--color-gray-blue-100);
  color: var(--color-gray-blue-900);
  font-weight: 700;
  border-radius: 10px;
  padding: 12px 21px;
  display: flex;
  justify-content: space-between;
  min-width: 255px;
  height: min-content;
  align-items: center;
`;

const InfoLabel = styled.span`
  color: var(--color-gray-blue-300);
  font-size: 1rem;
`;
const InfoValue = styled.span`
  font-size: var(--font-size-h2);
`;
export default GameBoard;
