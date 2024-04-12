import Navbar from "../../components/Navbar";
import NotFound from "../../components/NotFound";

import { Container } from "@mui/material";

export default function PageNotFound() {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <NotFound type="page" />
      </Container>
    </>
  );
}
