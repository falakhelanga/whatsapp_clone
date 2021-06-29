import styled from "styled-components";

import { Link } from "react-router-dom";
import { Formik } from "formik";
import { loginInit } from "../../formik_utils/initial_values";
import { loginSchema } from "../../formik_utils/validation_schemas";
import useIsAuth from "../../hooks_and_helpers/isAuth";
import useLogin from "../../hooks_and_helpers/loginHook";
import Spinner from "../utils/Spinner";
import { Paper } from "@material-ui/core";
const Container = styled.div``;

const Input = styled.input`
  border-radius: 5px;
  border: ${({ isInvalid }) => (isInvalid ? "red" : "none")};
  background-color: ${({ isInvalid }) => (isInvalid ? "tomato" : "none")};
  box-shadow: ${({ isInvalid }) => (isInvalid ? "0px 0px 10px red" : "none")};
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
const Error = styled.span``;
const Login = () => {
  useIsAuth();
  const { loginHandler, loading, error } = useLogin();

  const formSubmit = (values) => {
    loginHandler(values.name, values.password);
  };
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
          <Formik
            initialValues={loginInit}
            validationSchema={loginSchema}
            onSubmit={formSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              touched,
              isValid,
              isSubmitting,
              errors,
            }) => {
              return (
                <form
                  className="d-flex flex-column p-3"
                  onSubmit={handleSubmit}
                >
                  <div className="d-flex flex-column mt-3">
                    <label htmlFor="number" className="fw-bold text-white">
                      Unique Identifier
                    </label>
                    <Input
                      isInvalid={touched.number && errors.number}
                      name="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="your unique identifier"
                      className="py-2 ps-2"
                    />
                    {errors.number && (
                      <Error className="text-danger">{errors.number}</Error>
                    )}
                  </div>

                  <div className="d-flex flex-column mt-3">
                    <label htmlFor="password" className="fw-bold text-white">
                      password
                    </label>
                    <Input
                      isInvalid={touched.password && errors.password}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      placeholder="your password"
                      className="py-2 ps-2"
                    />
                    {errors.password && (
                      <Error className="text-danger">{errors.password}</Error>
                    )}
                  </div>
                  <Button
                    disabled={!isValid}
                    type="submit"
                    className="mt-3 btn btn-block bg-light fw-bold"
                  >
                    Login
                  </Button>
                  <div className="d-flex mt-2">
                    <p className="me-1 text-white">
                      Don`t have have an account?{" "}
                    </p>
                    <Link to="/register">register</Link>
                  </div>
                </form>
              );
            }}
          </Formik>
        </Col>
      </Container>
    </div>
  );
};

export default Login;
