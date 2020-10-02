import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  return (
    <div>
      <NavBar />
      <h1>Hello World</h1>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
