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

export default function Instructions(props) {
  const { instructions = [], onUpdate } = props;
  const [newInstruction, setNewInstruction] = useState("");

  const handleAddNewInstructions = () => {
    const newInstructionList = [...instructions];
    newInstructionList.push({
      id: nanoid(),
      label: newInstruction,
      completed: false,
    });
    onUpdate(newInstructionList);
    setNewInstruction("");
  };

  return (
    <Box
      sx={{
        paddingTop: "20px",
      }}
    >
      {instructions.length > 0 ? (
        <Typography variant="h6">Instructions:</Typography>
      ) : (
        <Typography variant="h6">No instructions added yet.</Typography>
      )}
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
