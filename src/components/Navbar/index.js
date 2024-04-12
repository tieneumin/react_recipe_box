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
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
              Recipe Box
            </Link>
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/add"
            // sx={{
            //   backgroundColor: "grey",
            //   "&:hover": {
            //     backgroundColor: "red",
            //   },
            // }}
          >
            Add Recipe
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
