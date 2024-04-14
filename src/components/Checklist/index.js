import { useState } from "react";
import { nanoid } from "nanoid";

import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Checklist(props) {
  const { type, items, onUpdate } = props;
  // console.log(type);
  // console.log(items);
  // console.log(onUpdate);
  const [string, setString] = useState("");

  const itemAdd = () => {
    // clone ingredients/instructions array
    const updatedItems = [...items];
    // add item to array
    updatedItems.push({
      id: nanoid(),
      string,
      completed: false,
    });
    // use updated array as parent-level function argument
    onUpdate(updatedItems);
    // clear input
    setString("");
  };

  return (
    <Box sx={{ my: 2 }}>
      {items.length === 0 ? (
        <Typography variant="h6">
          {type === "ingredient"
            ? "No ingredients added yet."
            : // type === "instruction"
              "No instructions added yet."}
        </Typography>
      ) : (
        <>
          <Typography variant="h6">
            {type === "ingredient"
              ? "Ingredients:"
              : // type === "instruction"
                "Instructions:"}
          </Typography>
          <List disablePadding>
            {items.map(({ id, string, completed }, index) => {
              return (
                <ListItem
                  key={id}
                  disablePadding
                  // sx={{ py: 0 }}
                  secondaryAction={
                    // delete button at end of ListItem
                    <IconButton
                      edge="end"
                      onClick={() => {
                        // use .filter() to retain all but selected item
                        const updatedItems = items.filter(
                          (retain) => retain.id !== id
                        );
                        // use updated array as parent-level function argument
                        onUpdate(updatedItems);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton
                    dense
                    disableRipple
                    // makes entire list item toggleable
                    onClick={() => {
                      // update selected item status for ingredients/instructions array
                      const updatedItems = items.map((i) => {
                        // update selected item status only
                        if (i.id === id) {
                          return {
                            ...i,
                            // assumes true; set false if true, true if false
                            completed: completed ? false : true,
                          };
                        }
                        // return others as is
                        return i;
                      });
                      // use updated array as parent-level function argument
                      onUpdate(updatedItems);
                    }}
                  >
                    {/* checkbox at start of ListItem */}
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={completed}
                        // disableRipple
                      />
                    </ListItemIcon>
                    {/* numbers for instructions */}
                    {type === "ingredient" ? (
                      <ListItemText
                        primary={string}
                        // strikethrough if completed
                        sx={
                          completed
                            ? {
                                textDecoration: "line-through",
                                opacity: 0.5,
                              }
                            : undefined
                        }
                      />
                    ) : (
                      // type === "instruction"
                      <ListItemText
                        primary={`${index + 1}. ${string}`}
                        // strikethrough if completed
                        sx={
                          completed
                            ? {
                                textDecoration: "line-through",
                                opacity: 0.5,
                              }
                            : undefined
                        }
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </>
      )}
      {/* end of items.length === 0 conditional */}
      <Box display="flex" gap="5px" sx={{ mt: 1 }}>
        <TextField
          fullWidth
          label={
            type === "ingredient"
              ? "Add new ingredient"
              : // type === "instruction"
                "Add new instruction"
          }
          value={string}
          onChange={(e) => {
            setString(e.target.value);
          }}
        />
        <Button variant="contained" sx={{ px: 5 }} onClick={itemAdd}>
          <AddIcon />
        </Button>
      </Box>
    </Box>
  );
}
