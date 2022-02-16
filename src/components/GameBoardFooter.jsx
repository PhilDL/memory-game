import styled from "styled-components/macro";
import { QUERIES } from "../constants";

const GameBoardFooter = ({
  playersScore,
  currentPlayerId,
  totalMoves,
  timeElapsed,
}) => {
  if (playersScore.length === 1) {
    return (
      <Footer>
        <InfoBox>
          <InfoLabel>Time</InfoLabel>
          <InfoValue>{timeElapsed}</InfoValue>
        </InfoBox>
        <InfoBox>
          <InfoLabel>Moves</InfoLabel>
          <InfoValue>{totalMoves}</InfoValue>
        </InfoBox>
      </Footer>
    );
  }
  return (
    <Footer>
      {playersScore.map((player) => {
        let selected = currentPlayerId === player.id;
        return (
          <InfoBox key={`player-score-${player.id}`} selected={selected}>
            <InfoLabel selected={selected}>
              P<PlayerSpanDesktop>layer </PlayerSpanDesktop>
              {player.id}
            </InfoLabel>
            <InfoValue>{player.matchedPairs}</InfoValue>
            {selected && <CurrentTurn>Current turn</CurrentTurn>}
          </InfoBox>
        );
      })}
    </Footer>
  );
};

const Footer = styled.footer`
  display: flex;
  gap: 24px;
  @media ${QUERIES.tabletAndUp} {
    gap: 30px;
  }
  justify-content: center;
  flex: 1;
  padding-bottom: 3em;
`;

const InfoBox = styled.div`
  background-color: var(
    ${(p) => (p.selected ? "--color-primary" : "--color-gray-100")}
  );
  color: var(
    ${(p) => (p.selected ? "--color-white" : "--color-gray-blue-900")}
  );
  border-radius: var(--radius-size-sm);
  padding: 12px 21px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  @media ${QUERIES.tabletAndUp} {
    max-width: 255px;
    flex-direction: row;
  }
  height: min-content;
  align-items: center;
  position: relative;
  ${(p) =>
    p.selected &&
    `
  ::after {
    content: "";
    position: absolute;
    left: calc(50% - var(--triangle-shape-size));
    bottom: 100%;
    width: 0;
    height: 0;
    border-left: var(--triangle-shape-size) solid transparent;
    border-right: var(--triangle-shape-size) solid transparent;
    border-bottom: var(--triangle-shape-size) solid var(--color-primary);
    clear: both;
  }`}
`;

const InfoLabel = styled.span`
  color: var(
    ${(p) => (p.selected ? "--color-white" : "--color-gray-blue-300")}
  );
  font-size: 1rem;
`;
const InfoValue = styled.span`
  @media ${QUERIES.tabletAndUp} {
    font-size: var(--font-size-h2);
  }
`;
const PlayerSpanDesktop = styled.span`
  display: none;
  @media ${QUERIES.tabletAndUp} {
    display: inline;
  }
`;

const CurrentTurn = styled.div`
  display: none;
  @media ${QUERIES.tabletAndUp} {
    display: revert;
  }
  color: var(--color-gray-blue-900);
  position: absolute;
  bottom: -38px;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 13px;
  text-align: center;
  width: 100%;
  left: 0;
`;

export default GameBoardFooter;
