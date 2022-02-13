/* eslint-disable no-unused-vars */
import styled from "styled-components/macro";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";

const EndScreen = ({
  isOpen,
  onDismiss,
  moves,
  timeElapsed,
  onRestart,
  onNewgame,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Content aria-label="Navigation Menu">
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
`;

const Content = styled(DialogContent)`
  background: var(--color-white);
  border-radius: var(--radius-size);
  min-width: 654px;
  height: auto;
  padding: 51px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 40px;
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
  gap: 16px;
`;
const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
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
  background-color: var(--color-gray-100);
  color: var(--color-gray-blue-700);
  font-weight: 700;
  border-radius: 10px;
  padding: 12px 21px;
  display: flex;
  justify-content: space-between;
  min-width: 255px;
  height: min-content;
  align-items: center;
  min-height: 72px;
`;

const InfoLabel = styled.span`
  color: var(--color-gray-blue-300);
  font-size: 1rem;
`;
const InfoValue = styled.span`
  font-size: var(--font-size-h2);
  color: var(--color-gray-blue-700);
`;
export default EndScreen;
