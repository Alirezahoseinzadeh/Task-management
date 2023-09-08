import {
  Box,
  Container,
  ListSubheader,
  CssBaseline,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTasks } from "../../ApiService.tsx/ApiServices";
import { Task } from "../../Models/Task";
import { useNavigate } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
export default function TaskManage() {
  const [open, setOpen] = useState(false);
  const redirect = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const [tasks, setTasks] = useState<Task[]>([]);

  const getData = async () => {
    try {
      const response = await getTasks();

      setTasks(response.data.data);
      console.log(response.data);
    } catch (error) {}
  };
  const clickhandler = () => {
    setOpen(!open);
  };
  return (
    <Box
      sx={{
        with: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ backgroundColor: "#e7e3dc" }}>
        <List
          sx={{ marginTop: "20px", background: "#E0F4F5" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              YOUR TASKS
            </ListSubheader>
          }>
          <ListItem>
            <ListItemText primary="title" secondary="status : DONE" />
            <ListItemText primary="go to shop and buy somthing for child" />
            <ListItemSecondaryAction>
              <Button
                onClick={clickhandler}
                sx={{ backgroundColor: open ? "green" : " orange" }}
                variant="contained"
                endIcon={open ? <ExpandMore /> : <ExpandLess />}>
                {open ? "Detail" : "close"}
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          {/* kak */}
          <Collapse
            in={open}
            sx={{ backgroundColor: "inherit", marginBottom: "0" }}>
            <Box sx={{ padding: "16px" }}>
              <ListItemText
                primary="Icon buttons are commonly found in app bars and toolbars.

                Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item."
                sx={{
                  backgroundColor: "black",
                  padding: "10px",
                  borderRadius: "10px",
                  color: "white",
                }}
              />
            </Box>
          </Collapse>
        </List>
      </Container>
    </Box>
  );

  /* {tasks.length > 0 ? (
        <List
          sx={{
            width: "90%",
          }}>
          {tasks.map((item) => (
            <ListItem
              sx={{
                border: "1px solid white",
                backgroundColor: "#fff",
                width: "100%",
                borderRadius: "10px",
              }}
              key={item.id}>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography
          sx={{
            backgroundColor: "#fff",
            width: "50%",
            height: "60px",
            borderRadius: "10px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "red",
            marginTop: "40px",
          }}
          variant="h5">
          {" "}
          ⚠ Ther Is No Item To Show
        </Typography>
      )}
      <Button variant="contained" color="success" onClick={creattask}>
        create task
      </Button> */
}
