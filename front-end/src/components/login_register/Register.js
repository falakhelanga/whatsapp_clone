import styled from "styled-components";
import { useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import useRegister from "../../hooks_and_helpers/register";

import Spinner from "../utils/Spinner";
import { Paper } from "@material-ui/core";
import { Formik } from "formik";
import { register } from "../../formik_utils/initial_values";
import { registration } from "../../formik_utils/validation_schemas";
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
const Register = () => {
  const { registerHandler, loading, error, token } = useRegister();
  const history = useHistory();

  const formSubmit = (values) => {
    registerHandler(values.name, values.number, values.password);
  };
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
          <Formik
            initialValues={register}
            validationSchema={registration}
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
                  <div className="d-flex flex-column">
                    <label htmlFor="name" className="fw-bold text-white">
                      Name
                    </label>
                    <Input
                      isInvalid={touched.name && errors.name}
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="your  name"
                      className="py-2 ps-2"
                    />
                    {errors.name && (
                      <Error className="text-danger">{errors.name}</Error>
                    )}
                  </div>
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
                    Register
                  </Button>
                  <div className="d-flex mt-2">
                    <p className="me-1 text-white">Already have an account? </p>
                    <Link to="/login">Log in</Link>
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

export default Register;
