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
        let selected = currentPlayerId == player.id;
        return (
          <InfoBox key={`player-score-${player.id}`} selected={selected}>
            <InfoLabel selected={selected}>
              P<PlayerSpanDesktop>layer </PlayerSpanDesktop>
              {player.id}
            </InfoLabel>
            <InfoValue>{player.matchedPairs}</InfoValue>
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
`;

const InfoBox = styled.div`
  background-color: var(
    ${(p) => (p.selected ? "--color-primary" : "--color-gray-100")}
  );
  color: var(
    ${(p) => (p.selected ? "--color-white" : "--color-gray-blue-900")}
  );
  font-weight: 700;
  border-radius: var(--radius-size-sm);
  padding: 12px 21px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  @media ${QUERIES.tabletAndUp} {
    flex-basis: 255px;
    flex-direction: row;
  }
  height: min-content;
  align-items: center;
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

export default GameBoardFooter;
