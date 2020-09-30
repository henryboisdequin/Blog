import React from "react";
import { Form, Formik } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <InputField />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;

{
  /* <FormControl>
<FormLabel htmlFor="username">Username</FormLabel>
<Input
  value={values.username}
  onChange={handleChange}
  id="username"
  placeholder="username"
/>
<FormErrorMessage>{form.errors.name}</FormErrorMessage>
</FormControl> */
}
