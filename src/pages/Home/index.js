import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";

export default function Home() {
  // get recipes from local storage
  let recipes = JSON.parse(localStorage.getItem("recipes"));
  // ensure recipes exists (prevents no recipes error)
  if (!recipes) recipes = [];

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" gutterBottom>
          All Recipes
        </Typography>
        {/* prompt to add recipe if none */}
        {recipes.length === 0 ? (
          <Card>
            <CardContent>
              <Typography variant="h5">No recipe added yet.</Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/add">
                Add A Recipe
              </Button>
            </CardActions>
          </Card>
        ) : (
          <Grid container spacing={2}>
            {recipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <RecipeCard type="home" recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
