import styled from "styled-components/macro";
import UnstyledButton from "../UnstyledButton";

export default styled(UnstyledButton)`
  font-weight: 700;
  border-radius: var(--radius-size);
  padding: 10px 14px;
  height: min-content;
  width: ${(p) => (p.width ? p.width : "auto")};
  text-align: center;
`;
