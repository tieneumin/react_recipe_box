import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { nanoid } from "nanoid";

export default function Ingredients(props) {
  const { ingredients = [], onUpdate } = props;
  const [newIngredient, setNewIngredient] = useState("");

  const handleAddNewIngredients = () => {
    const newIngredientList = [...ingredients];
    newIngredientList.push({
      id: nanoid(),
      label: newIngredient,
      completed: false,
    });
    onUpdate(newIngredientList);
    setNewIngredient("");
  };

  return (
    <>
      {/* <Box
        sx={{
          paddingTop: "20px",
        }}
      > */}
      {ingredients.length > 0 ? (
        <Typography variant="h6">Ingredients:</Typography>
      ) : (
        <Typography variant="h6">No ingredients added yet.</Typography>
      )}
      <List>
        {ingredients.map((item) => {
          return (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    // do delete item from checklist
                    const updatedIngredients = ingredients.filter(
                      (i) => i.id !== item.id
                    );
                    onUpdate(updatedIngredients);
                    /* second method */
                    // handleItemDelete(item.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
              // disablePadding
              sx={{ py: 0 }}
            >
              <ListItemButton
                dense
                onClick={() => {
                  // change the completed according to the checked status
                  const updatedIngredients = ingredients.map((i) => {
                    // update the item if the id is matched
                    if (i.id === item.id) {
                      return {
                        ...i,
                        completed: item.completed ? false : true,
                      };
                    }
                    // if id not match, just return its original data
                    return i;
                  });
                  onUpdate(updatedIngredients);
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={item.completed}
                    disableRipple
                    // onChange={(event, checked) => {
                    //   // change the completed according to the checked status
                    //   const updatedChecklist = checklist.map((i) => {
                    //     // update the item if the id is matched
                    //     if (i.id === item.id) {
                    //       return {
                    //         ...i,
                    //         completed: checked ? true : false,
                    //       };
                    //     }
                    //     // if id not match, just return its original data
                    //     return i;
                    //   });
                    //   onUpdate(updatedChecklist);
                    // }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={
                    item.completed
                      ? {
                          textDecoration: "line-through",
                          opacity: 0.5,
                        }
                      : null
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {/* </Box> */}
      <Box display="flex" gap={"5px"} sx={{ paddingTop: "20px" }}>
        <TextField
          label="Add new Item"
          fullWidth
          value={newIngredient}
          onChange={(event) => {
            setNewIngredient(event.target.value);
          }}
        />
        <Button
          variant="contained"
          sx={{
            paddingLeft: "45px",
            paddingRight: "45px",
          }}
          onClick={handleAddNewIngredients}
        >
          <AddIcon />
        </Button>
      </Box>
    </>
  );
}
