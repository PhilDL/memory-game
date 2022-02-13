import styled from "styled-components/macro";
import BaseButton from "./BaseButton";

export default styled(BaseButton)`
  background-color: var(--color-primary);
  color: var(--color-white);
  &:hover {
    background-color: var(--color-primary-hover);
  }
`;
