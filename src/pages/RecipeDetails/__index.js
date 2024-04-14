import { useState } from "react";
import { useParams } from "react-router-dom";

import { Container } from "@mui/material";

import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import Ingredients from "./ingredients";
import Instructions from "./instructions";
import NotFound from "../../components/NotFound";

export default function RecipeDetails() {
  // get id from URL
  const { id } = useParams();
  // get recipes from local storage
  let recipes = JSON.parse(localStorage.getItem("recipes"));
  // ensure recipes exists (prevents URL manipulation error)
  if (!recipes) recipes = [];
  // get recipe that matches id
  const recipe = recipes.find((r) => r.id === id);

  // ? : prevents error if RecipeDetails id manipulated
  const [ingredients, setIngredients] = useState(
    recipe ? recipe.ingredients : []
  );
  const [instructions, setInstructions] = useState(
    recipe ? recipe.instructions : []
  );

  return (
    <>
      <Navbar />
      {/* 404 if RecipeDetails id not found (prevents URL manipulation error) */}
      {recipe === undefined ? (
        <NotFound type="recipe" />
      ) : (
        <Container maxWidth="md">
          <RecipeCard type="details" recipes={recipes} recipe={recipe} />
          <Ingredients
            ingredients={ingredients}
            onUpdate={(newIngredients) => {
              setIngredients(newIngredients);
              // update recipes into the local storage
              const updatedRecipes = recipes.map((r) => {
                if (r.id === id) {
                  return {
                    ...r,
                    ingredients: newIngredients,
                  };
                }
                return r;
              });
              // store the updated recipe array into local storage
              localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
            }}
          />
          <Instructions
            instructions={instructions}
            onUpdate={(newInstructions) => {
              setInstructions(newInstructions);
              // update recipes into the local storage
              const updatedRecipes = recipes.map((r) => {
                if (r.id === id) {
                  return {
                    ...r,
                    instructions: newInstructions,
                  };
                }
                return r;
              });
              // store the updated recipe array into local storage
              localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
            }}
          />
        </Container>
      )}
    </>
  );
}
