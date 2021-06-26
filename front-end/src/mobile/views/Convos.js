import styled from "styled-components";
import Header from "../components/convos/Header";
import Convoses from "../components/convos/Convos";
const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

const Convos = () => {
  return (
    <Container>
      <Header />
      <Convoses />
    </Container>
  );
};

export default Convos;
