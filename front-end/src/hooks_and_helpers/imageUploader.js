import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateImageUrl } from "../store/actions/login";

const useUploader = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("/images/person.png");
  const { number } = useSelector((state) => state.login);

  const imageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setError(null);
    setLoading(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(`/upload/${number}`, formData, config);
      setLoading(false);
      setError(false);
      setImageUrl(data);
      dispatch(updateImageUrl(data));
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return { imageHandler, loading, error, imageUrl };
};

export default useUploader;
