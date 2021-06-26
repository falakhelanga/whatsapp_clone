import styled from "styled-components";

const Container = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: greenyellow;
  font-weight: bold;
  color: black;
  border-radius: 50%;

  display: ${({ numMessage }) => (numMessage > 0 ? "flex" : "none")};

  align-items: center;
  justify-content: center;
`;
const NumMessage = ({ numMessage }) => {
  return <Container numMessage={numMessage}>{numMessage}</Container>;
};

export default NumMessage;
