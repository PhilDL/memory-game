import React from "react";
import styled from "styled-components/macro";
import { PIECES } from "../gameData";
import UnstyledButton from "./ui/UnstyledButton";
import { motion, AnimatePresence } from "framer-motion";

const GamePiece = ({ piece, config, onFlipPiece }) => {
  const { flipped, matched, id } = piece;
  const { gridSize, theme } = config;
  let PieceIcon = null;
  if (theme === "icons") {
    PieceIcon = PIECES[piece.name];
  } else {
    PieceIcon = (props) => (
      <PieceIconNumber {...props}>{piece.name}</PieceIconNumber>
    );
  }

  return (
    <ButtonWrapper
      key={id}
      onClick={onFlipPiece.bind(this, piece)}
      matched={matched}
      flipped={flipped}
      gridSize={gridSize}
      theme={theme}
    >
      <AnimatePresence initial={false}>
        {flipped || matched ? (
          <motion.span
            key={`piece-${id}-icon`}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <PieceIcon name={piece.name} size={"100%"} />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </ButtonWrapper>
  );
};

const PieceIconNumber = styled.span`
  font-size: ${(p) => (p.gridSize === 4 ? "2.2rem" : "1.7rem")};
`;

const ButtonWrapper = styled(UnstyledButton)`
  width: var(--gameboard-${(p) => p.gridSize}-pieces-size);
  height: var(--gameboard-${(p) => p.gridSize}-pieces-size);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(p) =>
    p.matched
      ? "var(--color-gray-blue-100)"
      : p.flipped
      ? "var(--color-primary)"
      : "var(--color-gray-blue-900)"};
  &:hover {
    background-color: ${(p) =>
      p.matched
        ? "var(--color-gray-blue-100)"
        : p.flipped
        ? "var(--color-primary)"
        : "var(--color-gray-blue-500)"};
  }

  color: var(--color-white);
  padding: ${(p) => (p.theme === "icons" ? "30%" : null)};
  & svg {
    display: inherit;
  }
`;

export default React.memo(GamePiece);
