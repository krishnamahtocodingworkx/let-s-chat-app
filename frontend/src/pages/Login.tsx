import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { manualLogin } from "../redux/auth/AuthThunk";
import { APIResponseModal } from "../utils/modal";

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: Function = useDispatch();

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 4, marginTop: 5, textAlign: "center" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Login
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log("Login Data:", values);
            dispatch(manualLogin(values))
              .unwrap()
              .then((resp: APIResponseModal) => {
                if (resp?.isSuccess) {
                  navigate("/");
                }
              })
              .catch((error: any) => {
                console.log("error in page", error);
              });
          }}
        >
          {({ handleChange, handleBlur }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div style={{ color: "red", marginBottom: "10px" }}>
                <ErrorMessage name="email" component="div" />
              </div>

              <Field
                as={TextField}
                fullWidth
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div style={{ color: "red", marginBottom: "10px" }}>
                <ErrorMessage name="password" component="div" />
              </div>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>

        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account?
            <Button size="small" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
