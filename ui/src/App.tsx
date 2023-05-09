import "./App.css";
import {
  AppBar,
  Box,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { MakePage } from "./pages/Make/Make";

function App() {
  const theme = useTheme();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            Genfinity — Gridfinity generator
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: theme.spacing(2) }}>
        <MakePage />
      </div>
      <Credits />
    </div>
  );
}

const Credits = () => {
  return (
    <Box
      sx={(theme) => ({
        position: "fixed",
        bottom: 0,
        left: 0,
        padding: theme.spacing(1),
      })}
    >
      <Typography>
        Powered by the work of Zack Freedman at{" "}
        <Link href="https://www.youtube.com/@ZackFreedman" target="_blank">
          VoidStarLab
        </Link>
      </Typography>
      <Typography>
        And the Gridfinity{" "}
        <Link
          href="https://github.com/kennetek/gridfinity-rebuilt-openscad"
          target="_blank"
        >
          OpenSCAD rebuild
        </Link>{" "}
      </Typography>
      <Typography>
        Found a bug, have a suggestion ? Issues and PRs are welcome on{" "}
        <Link href="https://github.com/ShimmerGlass/genfinity">Github</Link>
      </Typography>
    </Box>
  );
};

export default App;
