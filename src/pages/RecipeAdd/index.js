import { Container, Typography } from "@mui/material";

import Navbar from "../../components/Navbar";
import Form from "../../components/Form";

export default function RecipeAdd() {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Add Recipe
        </Typography>
        <Form type="add" />
      </Container>
    </>
  );
}
