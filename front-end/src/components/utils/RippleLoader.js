import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: auto;
  left: auto;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  z-index: 1;
`;

const RippleLoader = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center w-100  "
      style={{ height: "100%" }}
    >
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

export default RippleLoader;
