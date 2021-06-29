import styled from "styled-components";
import { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PhoneIcon from "@material-ui/icons/Phone";
import { useLocation } from "react-router-dom";
import Header from "../components/profile/Header";
import { useDispatch, useSelector } from "react-redux";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #d8d8d8;
  background-color: #03141f;
  height: 100vh;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;
const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
const NameDiv = styled.div`
  display: flex;
  color: #d8d8d8;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #f4f4f4;
`;
const AboutDiv = styled.div`
  display: flex;
  color: #d8d8d8;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f4f4f4;
`;

const Profile = () => {
  const { convos } = useSelector((state) => state.convoReducer);
  const location = useLocation();
  const recipient = location.search.split("=")[1];
  const currChat = convos.find((convo) => convo.recipeientId === recipient);

  return (
    <>
      <Header />
      <Container className="container">
        <ImageContainer className="mt-4">
          <Image src={currChat.recipientImage} />
        </ImageContainer>
        <NameDiv className="w-100 mt-3 pb-3">
          <div className="d-flex align-items-start">
            <PersonIcon />
            <div className="d-flex flex-column ms-4">
              <span className="text-muted">Name</span>
              <span className="text-capitalize fw-bold">
                {currChat?.recipientName}
              </span>
            </div>
          </div>
        </NameDiv>

        <AboutDiv className="w-100 mt-3 pb-3">
          <div className="d-flex align-items-center">
            <PhoneIcon />
            <div className="d-flex flex-column ms-4">
              <span className="text-muted">Phone</span>

              <div className="">{currChat?.recipeientId}</div>
            </div>
          </div>
        </AboutDiv>
      </Container>
    </>
  );
};

export default Profile;
