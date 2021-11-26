import styled from "styled-components";
import { Artboard } from "./Artboard";
import { Heading } from "./Heading";

export function App() {
  return (
    <StyledApp>
      <Heading>Waves</Heading>
      <Artboard/>
    </StyledApp>
  );
}

const StyledApp = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 1rem;
`