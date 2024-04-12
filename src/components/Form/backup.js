import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import {
  // Box,
  Button,
  Card,
  CardContent,
  // Checkbox,
  // Container,
  // FormControlLabel,
  Grid,
  IconButton,
  // Link,
  styled,
  TextField,
  // Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";

export default function Form(props) {
  const { type, id, recipe } = props;
  const navigate = useNavigate();

  // ? : considers both RecipeAdd, RecipeEdit
  const [name, setName] = useState(recipe ? recipe.name : "");
  const [duration, setDuration] = useState(recipe ? recipe.duration : "");
  const [description, setDescription] = useState(
    recipe ? recipe.description : ""
  );
  const [image, setImage] = useState(recipe ? recipe.image : "");
  const [imageName, setImageName] = useState(recipe ? recipe.imageName : "");

  const imageUpload = (e) => {
    // as per sir's code; see also https://stackoverflow.com/questions/74536534/react-js-how-to-upload-image-with-preview-and-display-the-processe-image
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
    // visual feedback that image is attached
    setImageName(file.name);
  };

  const imageClear = () => {
    setImage("");
    setImageName("");
  };

  const formSubmit = () => {
    // validate form
    let error = "";
    // ensure all required fields filled
    if (name === "" || duration === "") {
      error = "Dish name and time to prepare are required.";
    }
    // trigger if error exists
    if (error !== "") {
      alert(error);
    } else {
      // if no error, 1) add recipe OR 2) updated selected recipe

      // 1) ADD
      if (type === "add") {
        const newRecipe = {
          id: nanoid(),
          name,
          duration,
          description,
          image,
          imageName,
          ingredients: [],
          instructions: [],
        };
        // get recipes from local storage
        // ! if passed as prop, recipes=undefined in RecipeAdd scenario causes recipes=[] overwrite whenever recipe added .'. recipes not passed as prop
        let recipes = JSON.parse(localStorage.getItem("recipes"));
        // ensure recipe exists (prevents no recipes error)
        if (!recipes) recipes = [];
        // add recipe to recipes
        recipes.push(newRecipe);
        // store updated recipes back in local storage
        localStorage.setItem("recipes", JSON.stringify(recipes));
        // redirect back to home page
        navigate("/home");
      }

      // 2) EDIT
      if (type === "edit") {
        // get recipes from local storage
        const recipes = JSON.parse(localStorage.getItem("recipes"));
        // update selected recipe in recipes
        const updatedRecipes = recipes.map((r) => {
          // overwrite selected recipe only
          if (r.id === id) {
            return {
              ...r,
              name,
              duration,
              description,
              image,
              imageName,
            };
          }
          return r;
        });
        // store updated recipes back in local storage
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
        // redirect back to selected recipe page
        navigate(`/recipe/${id}`);
      }
    }
  };
  // end of formSubmit

  // CSS to hide default <input type="file">
  const VisuallyHiddenInput = styled("input")({
    height: 0,
    width: 0,
  });

  return (
    <>
      <Card>
        <CardContent>
          {/* https://github.com/mui/material-ui/blob/v5.15.15/docs/data/material/getting-started/templates/sign-up/SignUp.js */}
          {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}> */}
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              // sm={6}
            >
              <TextField
                required
                fullWidth
                label="Dish name (e.g. spaghetti)"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Grid>
            <Grid
              item
              xs={12}
              // sm={6}
            >
              <TextField
                required
                fullWidth
                label="Time to prepare (e.g. 15m)"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                // style={{ textTransform: "capitalize" }}
              >
                {/* Upload Image button shows image name once image attached */}
                {imageName ? imageName : "Upload Image"}
                <VisuallyHiddenInput type="file" onChange={imageUpload} />
              </Button>
              {/* show icon to clear image if image attached*/}
              {image ? (
                <IconButton color="primary" sx={{ py: 0 }} onClick={imageClear}>
                  <ClearIcon />
                </IconButton>
              ) : (
                ""
              )}
            </Grid>
            {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
          </Grid>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={formSubmit}
          >
            {type === "add" ? "Create" : type === "edit" ? "Update" : ""}
          </Button>
          {/* <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid> */}
          {/* </Box> */}
        </CardContent>
      </Card>
    </>
  );
}
