import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #03141f;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  width: 200px;
  height: 200px;
`;
const HomeRouter = () => {
  return (
    <Container>
      <Img src="/images/whatsapp_logo.png" alt="whatsapp logo" />
    </Container>
  );
};

export default HomeRouter;
