import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <>
      <AppBar
        position="static"
        // color="secondary"
        sx={{ mb: 3 }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/home"
            style={{ textTransform: "capitalize" }}
          >
            <Typography variant="h6">Recipe Box</Typography>
          </Button>
          <Button color="inherit" component={Link} to="/add">
            Add Recipe
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
