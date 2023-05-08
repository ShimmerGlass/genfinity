import "./App.css";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { MakePage } from "./pages/Make";

function App() {
  const theme = useTheme();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            Gridfinity generator
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: theme.spacing(2) }}>
        <MakePage />
      </div>
    </div>
  );
}

export default App;
