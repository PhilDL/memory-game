import styled from "styled-components/macro";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";

const MobileMenu = ({ isOpen, onDismiss, onRestart, onNewgame }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Content aria-label="Navigation Menu">
        <Main>
          <PrimaryButton onClick={onRestart}>Restart</PrimaryButton>
          <SecondaryButton onClick={onNewgame}>New Game</SecondaryButton>
          <SecondaryButton onClick={onDismiss}>Resume Game</SecondaryButton>
        </Main>
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
  padding-right: 24px;
  padding-left: 24px;
`;

const Content = styled(DialogContent)`
  background: var(--color-white);
  border-radius: var(--radius-size-xl);
  width: 100%;
  max-width: 327px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 24px;
  gap: 16px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export default MobileMenu;
