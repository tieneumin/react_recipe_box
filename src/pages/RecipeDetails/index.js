import { useState } from "react";
import { useParams } from "react-router-dom";

import { Container } from "@mui/material";

import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import Checklist from "../../components/Checklist";
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

  // ensure child-level ingredient changes (add, toggle, delete) reflect/stored in parent/local storage
  const ingredientsUpdate = (updatedIngredients) => {
    setIngredients(updatedIngredients);
    // update selected recipe's ingredients for recipes array
    const updatedRecipes = recipes.map((r) => {
      // overwrite only selected recipe's ingredients
      if (r.id === id) {
        return {
          ...r,
          ingredients: updatedIngredients,
        };
      }
      // return others as is
      return r;
    });
    // store updated recipes back in local storage
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  // ensure child-level instruction changes (add, toggle, delete) reflect/stored in parent/local storage
  const instructionsUpdate = (updatedInstructions) => {
    setInstructions(updatedInstructions);
    // update selected recipe's instructions for recipes array
    const updatedRecipes = recipes.map((r) => {
      // overwrite only selected recipe's instructions
      if (r.id === id) {
        return {
          ...r,
          instructions: updatedInstructions,
        };
      }
      // return others as is
      return r;
    });
    // store updated recipes back in local storage
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  return (
    <>
      <Navbar />
      {/* 404 if RecipeDetails id not found (prevents URL manipulation error) */}
      {recipe === undefined ? (
        <NotFound type="recipe" />
      ) : (
        <Container maxWidth="md">
          <RecipeCard type="details" recipes={recipes} recipe={recipe} />
          <Checklist
            type="ingredient"
            items={ingredients}
            onUpdate={ingredientsUpdate}
          />
          <Checklist
            type="instruction"
            items={instructions}
            onUpdate={instructionsUpdate}
          />
        </Container>
      )}
    </>
  );
}
