import styled from "styled-components/macro";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";
import { QUERIES } from "../constants";

const EndScreen = ({
  isOpen,
  onDismiss,
  moves,
  timeElapsed,
  onRestart,
  onNewgame,
  playersScore,
}) => {
  if (!isOpen) {
    return null;
  }
  let endScreenContent = null;
  if (playersScore.length === 1) {
    endScreenContent = (
      <>
        <Header>
          <Title>You did it!</Title>
          <SubTitle>Game over! Here's how you got on...</SubTitle>
        </Header>
        <Main>
          <InfoBox>
            <InfoLabel>Time Elapsed</InfoLabel>
            <InfoValue>{timeElapsed}</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoLabel>Moves Taken</InfoLabel>
            <InfoValue>{moves}</InfoValue>
          </InfoBox>
        </Main>
      </>
    );
  } else {
    let title =
      playersScore.filter((p) => p.winner).length > 1
        ? "It’s a tie!"
        : `Player ${playersScore[0].id} Wins!`;
    endScreenContent = (
      <>
        <Header>
          <Title>{title}</Title>
          <SubTitle>Game over! Here are the results...</SubTitle>
        </Header>
        <Main>
          {playersScore.map((player) => (
            <InfoBox winner={player.winner}>
              <InfoLabel winner={player.winner}>
                Player {player.id} {player.winner ? "(Winner!)" : ""}
              </InfoLabel>
              <InfoValue>{player.matchedPairs} Pairs</InfoValue>
            </InfoBox>
          ))}
        </Main>
      </>
    );
  }

  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Content aria-label="Game Over Info">
        {endScreenContent}
        <Footer>
          <PrimaryButton width={"100%"} onClick={onRestart}>
            Restart
          </PrimaryButton>
          <SecondaryButton width={"100%"} onClick={onNewgame}>
            Setup New Game
          </SecondaryButton>
        </Footer>
      </Content>
    </Overlay>
  );
};

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsla(220, 5%, 40%, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const Content = styled(DialogContent)`
  background: var(--color-white);
  border-radius: var(--radius-size-button);
  width: 100%;
  max-width: 654px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
  padding: 24px;
  @media ${QUERIES.tabletAndUp} {
    gap: 40px;
    padding: 51px;
  }

  animation: slide 0.2s ease-in;

  @keyframes slide {
    0% {
      width: 0px;
    }
    100% {
      width: 300px;
    }
  }
`;

const Header = styled.header`
  text-align: center;
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media ${QUERIES.tabletAndUp} {
    gap: 16px;
  }
`;
const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media ${QUERIES.tabletAndUp} {
    flex-direction: revert;
  }
  gap: 14px;
`;

const Title = styled.h1`
  font-size: var(--font-size-h1);
  color: var(--color-gray-blue-700);
  font-weight: 700;
`;

const SubTitle = styled.p`
  font-weight: 700;
  color: var(--color-gray-blue-300);
`;

const InfoBox = styled.div`
  background-color: var(
    ${(p) => (p.winner ? "--color-gray-blue-700" : "--color-gray-100")}
  );
  color: var(${(p) => (p.winner ? "--color-white" : "--color-gray-blue-700")});
  font-weight: 700;
  border-radius: var(--radius-size-sm);
  padding: 11px 16px;
  @media ${QUERIES.tabletAndUp} {
    padding: 12px 21px;
  }
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: min-content;
  align-items: center;
  min-height: 72px;
`;

const InfoLabel = styled.span`
  color: var(${(p) => (p.winner ? "--color-white" : "--color-gray-blue-300")});
  font-size: 1rem;
`;
const InfoValue = styled.span`
  font-size: var(--font-size-h3);
  @media ${QUERIES.tabletAndUp} {
    font-size: var(--font-size-h2);
  }
`;
export default EndScreen;
