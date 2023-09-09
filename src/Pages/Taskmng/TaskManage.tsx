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
// import { Task } from "../../Models/Task";
import { Link, useNavigate } from "react-router-dom";
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
import { log } from "console";
export default function TaskManage() {
  const [open, setOpen] = useState(false);
  const redirect = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const initialTasks = [
    {
      title: "Task 1",
      status: "DONE",
      description: "Description for Task 1",
      open: false,
    },
    {
      title: "Task 2",
      status: "DONE",
      description: "Description for Task 2",
      open: false,
    },
    {
      title: "Task 3",
      status: "DONE",
      description: "Description for Task 3",
      open: false,
    },
    {
      title: "Task 4",
      status: "DONE",
      description: "Description for Task 4",
      open: false,
    },
  ];
  const [tasks, setTasks] = useState(initialTasks);

  const getData = async () => {
    try {
      const response = await getTasks();

      setTasks(response.data.data);
      console.log(response.data);
    } catch (error) {}
  };

  const toggleOpen = (index: any) => {
    const updatedTasks = [...tasks];
    console.log(updatedTasks[0].open);
    updatedTasks[index].open = !updatedTasks[index].open;
    setTasks(updatedTasks);
    console.log(updatedTasks);
  };
  const Buttonstyle = {
    backgroundColor: "#25accc",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#021E20",
      color: "#fff",
    },
    marginTop: "10px",
    fontWeight: 700,
  };
  return (
    <Box
      sx={{
        with: "100%",
        display: "flex",
        justifyContent: "center",
      }}>
      <CssBaseline />
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "#e7e3dc",
          textAlign: "center",
        }}>
        <List
          sx={{ marginTop: "20px", background: "#E0F4F5" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{ fontSize: "20px", color: "#BC0000" }}>
              YOUR TASKS
            </ListSubheader>
          }>
          {tasks.map((item, index) => (
            <Box>
              <ListItem>
                <ListItemText
                  primary={item.title}
                  secondary={`status : ${item.status}`}
                />
                <ListItemText primary="go to shop and buy somthing for child" />
                <ListItemSecondaryAction>
                  <Button
                    onClick={() => toggleOpen(index)}
                    sx={{ backgroundColor: item.open ? "orange" : " green" }}
                    variant="contained"
                    endIcon={item.open ? <ExpandLess /> : <ExpandMore />}>
                    {item.open ? "Close" : "Detail"}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse in={item.open}>
                <ListItem sx={{ backgroundColor: "inherit" }}>
                  <Box sx={{ padding: "16px" }}>
                    <ListItemText
                      primary={item.description}
                      sx={{
                        backgroundColor: "black",
                        padding: "10px",
                        borderRadius: "10px",
                        color: "white",
                      }}
                    />
                  </Box>
                </ListItem>
              </Collapse>
            </Box>
          ))}
        </List>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link to="/creat-task">
            <Box sx={{ padding: "10px 5px 20px 5px" }}>
              <Button sx={Buttonstyle}>Edit Task</Button>
            </Box>
          </Link>
          <Link to="/your-other-route">
            <Box sx={{ padding: "10px 5px 20px 5px" }}>
              <Button sx={Buttonstyle}>Create New Task</Button>
            </Box>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
