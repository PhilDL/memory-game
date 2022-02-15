import {
  Camera,
  Anchor,
  Award,
  Feather,
  Gitlab,
  Sun,
  Umbrella,
  Zap,
  Trash,
  Home,
  Dribbble,
  Cpu,
  Coffee,
  Codesandbox,
  Briefcase,
  Activity,
  Chrome,
  CloudLightning,
} from "react-feather";

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export const PIECES = {
  camera: Camera,
  anchor: Anchor,
  award: Award,
  feather: Feather,
  gitlab: Gitlab,
  sun: Sun,
  umbrella: Umbrella,
  zap: Zap,
  trash: Trash,
  home: Home,
  dribbble: Dribbble,
  cpu: Cpu,
  coffee: Coffee,
  codesandbox: Codesandbox,
  briefcase: Briefcase,
  activity: Activity,
  chrome: Chrome,
  cloudLightning: CloudLightning,
};

export const createGamePieces = (gridSize = 6, theme = "icons") => {
  let pieces = [];
  if (theme === "icons") {
    pieces = Object.getOwnPropertyNames(PIECES);
  } else {
    pieces = [...Array(100).keys()];
  }
  shuffleArray(pieces);
  let gamePieces = [];
  let iterations = (gridSize * gridSize) / 2;
  for (let i = 0; i < iterations; i++) {
    gamePieces.push(pieces[i]);
    gamePieces.push(pieces[i]);
  }
  shuffleArray(gamePieces);
  gamePieces = gamePieces.map((piece, index) => {
    return {
      name: piece,
      id: index,
      flipped: false,
      matched: false,
    };
  });
  return gamePieces;
};

export const createPlayers = (nbOfPlayers) => {
  let players = [];
  for (let i = 1; i <= nbOfPlayers; i++) {
    players.push({
      id: i,
      moves: 0,
      matchedPairs: 0,
      winner: false,
    });
  }
  return players;
};
