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
  const { type, recipes, recipe } = props;
  // console.log(type); // home / details
  // console.log(recipes); // undefined / OK
  // console.log(recipe); // OK / OK
  const { id, name, duration, description, image } = recipe;

  const navigate = useNavigate();

  const recipeDelete = () => {
    // browser confirmatory box; returns true if Yes, false if No
    const response = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    // if true, delete recipe

    if (response) {
      // use .filter() to retain all but current recipe
      const updatedRecipes = recipes.filter((retain) => retain.id !== id);
      // store updated recipes back in local storage
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      // redirect back to home page
      navigate("/home");
    }
  };

  return (
    <Card>
      {image && type === "details" ? (
        <CardMedia component="img" src={image} style={{ maxHeight: "480px" }} />
      ) : (
        ""
      )}
      <CardContent sx={{ pb: 0 }}>
        <Box display="flex">
          <Typography variant="h5" gutterBottom style={{ flexGrow: 1 }}>
            {name}
          </Typography>
          {type === "details" ? (
            <IconButton sx={{ p: 0 }} onClick={recipeDelete}>
              <DeleteIcon />
            </IconButton>
          ) : (
            ""
          )}
        </Box>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary={duration} />
          </ListItem>
          {description && type === "details" ? (
            <ListItem disablePadding>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    {autop(description)
                      .split("\n") // split string into array elements by newline char
                      .map((p, i) => (
                        // return array elements individually so each paragraph has own margin
                        <Typography
                          key={i}
                          dangerouslySetInnerHTML={{ __html: p }} // render as HTML
                          sx={{ my: 0.75 }}
                        />
                      ))}
                  </>
                }
              />
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </CardContent>
      <CardActions style={{ alignText: "flex", justifyContent: "center" }}>
        {type === "home" ? (
          <Button component={Link} to={`/recipe/${id}`}>
            View Details
          </Button>
        ) : (
          // type === "details"
          <Button component={Link} to={`/recipe/${id}/edit`}>
            Edit Recipe
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
