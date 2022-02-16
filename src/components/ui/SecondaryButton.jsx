import styled from "styled-components/macro";
import BaseButton from "./BaseButton";

export default styled(BaseButton)`
  background-color: var(--color-gray-100);
  color: var(--color-gray-blue-900);
  &:hover {
    background-color: var(--color-gray-blue-500);
    color: var(--color-white);
  }
`;
