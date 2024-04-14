import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export default function NotFound(props) {
  const { type = "recipe" } = props;
  return (
    <>
      <Box textAlign="center">
        <Typography variant="h5" sx={{ mb: 2 }}>
          {type === "page"
            ? "404: Page Not Found"
            : // type === "recipe"
              "Recipe does not exist."}
        </Typography>
        <Button variant="contained" component={Link} to="/home">
          Go back
        </Button>
      </Box>
    </>
  );
}
