import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { Link as LinkUi, useAutocomplete } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { checkLogin } from "../../ApiService.tsx/ApiServices";

const defaultTheme = createTheme();

export default function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const loginclick = async () => {
    if (!username) {
      alert("please insert valid username");
      return;
    }
    if (!password) {
      alert("please insert valid password");
      return;
    }

    try {
      const response = await checkLogin(username, password);
      alert(response.data.message);
      localStorage.setItem("token", response.data.data.token);
      navigate("/task-mng");
      console.log(response.data.data.token);
    } catch (error: any) {
      if (error.response.status == 400) {
        alert(error.response.data.message);
      }
      console.log(error.response.data.success);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="div" maxWidth="xs" sx={{ marginTop: 8 }} fixed>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={loginclick}>
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/sign-up">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
