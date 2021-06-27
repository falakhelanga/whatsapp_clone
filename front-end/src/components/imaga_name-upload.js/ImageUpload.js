import styled from "styled-components";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { useHistory } from "react-router-dom";
import RippleLoader from "../utils/RippleLoader";
import useUploader from "../../hooks_and_helpers/imageUploader";
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`;

const Image = styled.img`
  height: 250px;
  width: 250px;
  border-radius: 50%;
  &:hover {
    opacity: 0.8;
  }
`;

const Label = styled.label`
  border-radius: 50%;
  position: relative;
  cursor: pointer;
`;

const Camera = styled.div`
  position: absolute;
  bottom: 50px;
  right: 5px;
  background-color: rgb(3, 20, 31);
  border-radius: 50%;
  &:hover {
    opacity: 0.8;
  }
`;

const Button = styled.button``;
const ImageUpload = () => {
  const history = useHistory();
  const { imageHandler, imageUrl, loading } = useUploader();
  return (
    <Container>
      <div className="mt-4">
        <Label htmlFor="upload_button" className=" fw-bold bg-white p-1">
          {loading && <RippleLoader />}

          <Image src={imageUrl} className="" />
          <Camera className="p-2">
            <CameraAltIcon />
          </Camera>
        </Label>
        <input
          onChange={(e) => {
            imageHandler(e);
          }}
          type="file"
          id="upload_button"
          hidden
        />
      </div>
      <div className="fw-bold mt-3">
        click the image to choose your profile picture
      </div>
      <Button
        type="button"
        className="btn btn-dark mt-2 fw-bold"
        onClick={() => {
          history.replace("/");
        }}
      >
        Continue
      </Button>
    </Container>
  );
};

export default ImageUpload;
