import React from "react";
import { Wrapper } from "../components/Wrapper";

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = ({}) => {
  return (
    <Wrapper>
      <h1>404 Not Found</h1>
    </Wrapper>
  );
};

export default ErrorPage;
