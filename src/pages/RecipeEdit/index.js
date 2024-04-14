import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Form from "../../components/Form";
import NotFound from "../../components/NotFound";

import { Container, Typography } from "@mui/material";

export default function RecipeEdit() {
  // get id from URL
  const { id } = useParams();
  // get recipes from local storage
  let recipes = JSON.parse(localStorage.getItem("recipes"));
  // ensure recipes exists (prevents URL manipulation error)
  if (!recipes) recipes = [];
  // get recipe that matches id
  const recipe = recipes.find((r) => r.id === id);

  return (
    <>
      <Navbar />
      {/* 404 if RecipeEdit id not found (prevents URL manipulation Form component error) */}
      {recipe === undefined ? (
        <NotFound type="recipe" />
      ) : (
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Edit Recipe
          </Typography>
          <Form type="edit" id={id} recipe={recipe} />
        </Container>
      )}
    </>
  );
}
