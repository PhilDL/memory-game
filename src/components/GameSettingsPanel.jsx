import React, { useContext, useRef, useState } from "react";
import styled from "styled-components/macro";
import { useFocusRing } from "@react-aria/focus";
import { useRadioGroup, useRadio } from "@react-aria/radio";
import { useRadioGroupState } from "@react-stately/radio";
import PrimaryButton from "./ui/PrimaryButton";
import VisuallyHidden from "./ui/VisuallyHidden";
import { QUERIES } from "../constants";

let RadioContext = React.createContext(null);

function RadioGroup(props) {
  let { children, label } = props;
  let state = useRadioGroupState(props);
  let { radioGroupProps, labelProps } = useRadioGroup(props, state);
  return (
    <SettingGroup {...radioGroupProps}>
      <SettingLabel {...labelProps}>{label}</SettingLabel>
      <RadioContext.Provider value={state}>
        <SettingOptionValues>{children}</SettingOptionValues>
      </RadioContext.Provider>
    </SettingGroup>
  );
}

function Radio(props) {
  let { children } = props;
  let state = useContext(RadioContext);
  let ref = useRef(null);
  let { inputProps } = useRadio(props, state, ref);
  let isSelected = state.selectedValue === props.value;
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <SettingOptionLabel isSelected={isSelected} isFocusVisible={isFocusVisible}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      {children}
    </SettingOptionLabel>
  );
}

const GameSettingsPanel = ({ onGameStartHandler }) => {
  const [theme, setTheme] = useState("numbers");
  const [nbOfPlayers, setNbOfPlayers] = useState(1);
  const [gridSize, setGridSize] = useState(4);

  const startGameHandler = (e) => {
    e.preventDefault();
    onGameStartHandler({
      theme: theme,
      nbOfPlayers: +nbOfPlayers,
      gridSize: +gridSize,
    });
  };
  return (
    <Main>
      <GameTitle>memory</GameTitle>
      <GameSettingsForm name="Game settings">
        <RadioGroup
          label="Select Theme"
          defaultValue="numbers"
          onChange={(value) => {
            setTheme(value);
          }}
        >
          <Radio value="numbers">Numbers</Radio>
          <Radio value="icons" selected={true}>
            Icons
          </Radio>
        </RadioGroup>
        <RadioGroup
          label="Number of Players"
          defaultValue="1"
          onChange={(value) => {
            setNbOfPlayers(value);
          }}
        >
          <Radio value="1">1</Radio>
          <Radio value="2">2</Radio>
          <Radio value="3">3</Radio>
          <Radio value="4">4</Radio>
        </RadioGroup>
        <RadioGroup
          label="Grid Size"
          defaultValue="4"
          onChange={(value) => {
            setGridSize(value);
          }}
        >
          <Radio value="4">4x4</Radio>
          <Radio value="6">6x6</Radio>
        </RadioGroup>
        <StartGameButton onClick={startGameHandler}>Start Game</StartGameButton>
      </GameSettingsForm>
    </Main>
  );
};

const Main = styled.main`
  max-width: 702px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 45px;
  @media ${QUERIES.tabletAndUp} {
    gap: 78px;
  }
  padding: 24px;
`;
const GameTitle = styled.h1`
  font-size: var(--font-size-h1);
  text-align: center;
  font-weight: 700;
  color: white;
`;

const GameSettingsForm = styled.form`
  background-color: var(--color-white);
  border-radius: var(--radius-size-xl);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  gap: 24px;
  @media ${QUERIES.tabletAndUp} {
    gap: 32px;
    padding: 46px;
  }
`;

const SettingGroup = styled.fieldset``;
const SettingLabel = styled.legend`
  font-weight: 700;
  display: block;
  color: var(--color-gray-blue-300);
  margin-bottom: 11px;
`;

const StartGameButton = styled(PrimaryButton)`
  height: 50px;
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 8px;
`;

const SettingOptionLabel = styled.label`
  display: inline-block;
  font-weight: 700;
  color: var(--color-white);
  background-color: var(
    --color-gray-blue-${(p) => (p.isSelected ? "900" : "300")}
  );
  padding: 10px;
  flex: 1;
  border-radius: var(--radius-size-button);
  text-align: center;
  cursor: pointer;
  @media ${QUERIES.tabletAndUp} {
    font-size: var(--font-size-h3);
  }
  &:hover {
    background-color: var(
      --color-gray-blue-${(p) => (p.isSelected ? "900" : "500")}
    );
  }
  outline: ${(p) =>
    p.isFocusVisible ? "2px solid var(--color-primary)" : "none"};
`;

const SettingOptionValues = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 11px;
  @media ${QUERIES.tabletAndUp} {
    gap: 30px;
  }
`;
export default GameSettingsPanel;
