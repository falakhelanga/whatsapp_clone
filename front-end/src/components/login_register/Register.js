import styled from "styled-components";
import { useEffect } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import useRegister from "../../hooks_and_helpers/register";
import useIsAuth from "../../hooks_and_helpers/isAuth";
import Spinner from "../utils/Spinner";
import { Paper } from "@material-ui/core";
const Container = styled.div``;

const Input = styled.input`
  border-radius: 5px;
  border: none;
  outline: none;
  &:focus {
    background-color: #d8d8d8d8;
    border: #20b3b8;
    box-shadow: 0px 0px 10px #20b3b8;
  }
`;

const Button = styled.button``;

const Col = styled.div`
  background-color: #03141f;
  border-radius: 10px;
`;

const Register = () => {
  const { registerHandler, loading, error, token } = useRegister();
  const history = useHistory();
  const nameRef = useRef();
  const numberRef = useRef();
  const passwordRef = useRef();
  useEffect(() => {
    if (token) {
      history.push("/upload");
    }
  }, [token, history]);
  return loading ? (
    <Spinner />
  ) : (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ height: "100vh" }}
    >
      <Container className="row container d-flex justify-content-center align-items-center">
        <Col className="col-sm-12 col-md-8 col-lg-6 p-3">
          {error && <Paper className="bg-danger p-3 text-white">{error}</Paper>}

          <form className="d-flex flex-column p-3">
            <div className="d-flex flex-column">
              <label htmlFor="name" className="fw-bold text-white">
                Name
              </label>
              <Input
                ref={nameRef}
                type="text"
                placeholder="your  name"
                className="py-2 ps-2"
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <label htmlFor="number" className="fw-bold text-white">
                number
              </label>
              <Input
                ref={numberRef}
                type="text"
                placeholder="your number"
                className="py-2 ps-2"
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <label htmlFor="password" className="fw-bold text-white">
                password
              </label>
              <Input
                ref={passwordRef}
                type="password"
                placeholder="your password"
                className="py-2 ps-2"
              />
            </div>

            <Button
              type="submit"
              className="mt-3 btn btn-block bg-light fw-bold"
              onClick={(e) => {
                e.preventDefault();
                const name = nameRef?.current?.value;
                const number = numberRef?.current?.value;
                const password = passwordRef?.current?.value;
                registerHandler(name, number, password);
              }}
            >
              Register
            </Button>
            <div className="d-flex mt-2">
              <p className="me-1 text-white">Already have an account? </p>
              <Link to="/login">Log in</Link>
            </div>
          </form>
        </Col>
      </Container>
    </div>
  );
};

export default Register;
