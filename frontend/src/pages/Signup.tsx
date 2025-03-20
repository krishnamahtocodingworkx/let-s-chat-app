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

// Validation Schema
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 4, marginTop: 5, textAlign: "center" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Sign Up
        </Typography>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log("Signup Data:", values);
            navigate("/login"); // Redirect to login after signup
          }}
        >
          {({ handleChange, handleBlur }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Full Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div style={{ color: "red", marginBottom: "10px" }}>
                <ErrorMessage name="name" component="div" />
              </div>

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
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>

        <Box mt={2}>
          <Typography variant="body2">
            Already have an account?
            <Button size="small" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
