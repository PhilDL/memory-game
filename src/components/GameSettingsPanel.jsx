import React, { useContext, useRef, useState } from "react";
import styled from "styled-components/macro";
import GameContext from "../store/game-context";
import { useRadioGroup, useRadio } from "@react-aria/radio";
import { useRadioGroupState } from "@react-stately/radio";
import UnstyledButton from "./UnstyledButton";
import VisuallyHidden from "./VisuallyHidden";

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

  return (
    <SettingOptionLabel isSelected={isSelected}>
      <VisuallyHidden>
        <input {...inputProps} ref={ref} />
      </VisuallyHidden>
      {children}
    </SettingOptionLabel>
  );
}

const GameSettingsPanel = ({ onGameStartHandler }) => {
  const gameCtx = useContext(GameContext);
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
  max-width: 654px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 78px;
`;
const GameTitle = styled.h1`
  font-size: var(--font-size-h1);
  text-align: center;
  font-weight: 700;
  color: white;
`;

const GameSettingsForm = styled.form`
  background-color: var(--color-white);
  min-height: 500px;
  border-radius: var(--radius-size-xl);
  padding: 46px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 33px;
  height: 100%;
`;

const SettingGroup = styled.div``;
const SettingLabel = styled.span`
  font-weight: 700;
  display: block;
  color: var(--color-gray-blue-300);
`;
const SettingValues = styled.div``;

const StartGameButton = styled(UnstyledButton)`
  margin: auto;
  width: 100%;
  height: 50px;
  border-radius: var(--radius-size-xl);
  background-color: var(--color-primary);
  color: white;
  text-align: center;
  font-weight: 700;
  font-size: 1.2rem;
`;

const SettingOptionLabel = styled.label`
  display: inline-block;
  font-weight: 700;
  color: var(--color-white);
  font-size: var(--font-size-h3);
  background-color: var(
    --color-gray-blue-${(p) => (p.isSelected ? "900" : "300")}
  );
  padding: 10px;
  flex: 1;
  border-radius: var(--radius-size);
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: var(
      --color-gray-blue-${(p) => (p.isSelected ? "900" : "500")}
    );
  }
`;

const SettingOptionValues = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
`;
export default GameSettingsPanel;
