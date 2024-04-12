import { Link, useNavigate } from "react-router-dom";
import { autop } from "@wordpress/autop";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RecipeCard(props) {
  const { type, recipe } = props;
  const { id, name, duration, description, image } = recipe;
  const navigate = useNavigate();

  const recipeDelete = () => {
    // browser confirmatory box; returns true if Yes, false if No
    const answer = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    // if true, delete recipe
    if (answer) {
      const recipes = JSON.parse(localStorage.getItem("recipes"));
      // use .filter() to retain all but current recipe
      const updatedRecipes = recipes.filter((retain) => retain.id !== id);
      // store updated recipes back in local storage
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      // redirect back to home page
      navigate("/home");
    } // end answer conditional
  };

  return (
    <Card>
      {image && type === "recipe" ? (
        <CardMedia
          component="img"
          src={image}
          style={{ maxHeight: "310.5px" }}
        />
      ) : (
        ""
      )}
      <CardContent sx={{ pb: 0 }}>
        <Box display="flex">
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            {name}
          </Typography>
          {type === "recipe" ? (
            <IconButton sx={{ p: 0 }} onClick={recipeDelete}>
              <DeleteIcon />
            </IconButton>
          ) : (
            ""
          )}
        </Box>
        <List>
          {/* <ListItem>{<img src={image} />}</ListItem> */}
          <ListItem>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary={duration} />
          </ListItem>
          {description && type === "recipe" ? (
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              {/* <ListItemText primary={autop(description)} /> */}
              {/* <div
                dangerouslySetInnerHTML={{
                  __html: autop(description),
                }}
              /> */}
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        {/* conditional rendering */}
        {type === "home" ? (
          <Button component={Link} to={`/recipe/${id}`}>
            See More
          </Button>
        ) : (
          // type === "recipe"
          <Button component={Link} to={`/recipe/${id}/edit`}>
            Edit Recipe
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
