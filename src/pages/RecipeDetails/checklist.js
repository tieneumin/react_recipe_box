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

export default function Instructions(props) {
  const { type, instructions, onUpdate } = props;
  const [newInstruction, setNewInstruction] = useState("");

  const handleAdd = () => {
    const newInstruction = [...instructions];
    newInstruction.push({
      id: nanoid(),
      label: newInstruction,
      completed: false,
    });
    onUpdate(newInstruction);
    setNewInstruction("");
  };

  return (
    <Box
      sx={{
        paddingTop: "20px",
      }}
    >
      {instructions.length > 0 ? (
        <List>
          {instructions.map((item) => {
            return (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      // do delete item from checklist
                      const updatedInstructions = instructions.filter(
                        (i) => i.id !== item.id
                      );
                      onUpdate(updatedInstructions);
                      /* second method */
                      // handleItemDelete(item.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  dense
                  onClick={() => {
                    // change the completed according to the checked status
                    const updatedInstructions = instructions.map((i) => {
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
                    onUpdate(updatedInstructions);
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
      ) : (
        <Typography variant="h6">No instructions added yet.</Typography>
      )}
      <Box display="flex" gap={"5px"} sx={{ paddingTop: "20px" }}>
        <TextField
          label="Add new Instructions"
          fullWidth
          value={newInstruction}
          onChange={(event) => {
            setNewInstruction(event.target.value);
          }}
        />
        <Button
          variant="contained"
          sx={{
            paddingLeft: "45px",
            paddingRight: "45px",
          }}
          onClick={handleAddNewInstructions}
        >
          <AddIcon />
        </Button>
      </Box>
    </Box>
  );
}
