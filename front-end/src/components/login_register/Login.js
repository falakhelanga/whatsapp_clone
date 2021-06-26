import styled from "styled-components";
import { useRef } from "react";
import { Link } from "react-router-dom";

import useIsAuth from "../../hooks_and_helpers/isAuth";
import useLogin from "../../hooks_and_helpers/loginHook";
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

const Login = () => {
  useIsAuth();
  const { loginHandler, loading, error } = useLogin();

  const numberRef = useRef();
  const passwordRef = useRef();

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
                Number
              </label>
              <Input
                ref={numberRef}
                type="text"
                placeholder="your number"
                className="py-2 ps-2"
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <label htmlFor="number" className="fw-bold text-white">
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
                loginHandler(
                  numberRef?.current?.value,
                  passwordRef?.current?.value
                );
              }}
            >
              Login
            </Button>
            <div className="d-flex mt-2">
              <p className="me-1 text-white">Don`t have have an account? </p>
              <Link to="/register">register</Link>
            </div>
          </form>
        </Col>
      </Container>
    </div>
  );
};

export default Login;
