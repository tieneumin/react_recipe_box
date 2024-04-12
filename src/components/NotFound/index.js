import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export default function NotFound(props) {
  const { type = "recipe" } = props;
  return (
    <>
      <Box
        style={{
          textAlign: "center",
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          // marginTop: 8,
        }}
      >
        <Typography variant="h5">
          {type === "page"
            ? "404: Page Not Found"
            : // type === "recipe"
              "Recipe does not exist."}
        </Typography>
        <Button variant="contained" component={Link} to="/home" sx={{ mt: 2 }}>
          Go back
        </Button>
      </Box>
    </>
  );
}
