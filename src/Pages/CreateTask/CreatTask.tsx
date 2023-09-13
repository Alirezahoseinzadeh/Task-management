import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Modal,
  Paper,
  Container,
  Stack,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  createtask,
  deletetask,
  getTasks,
  updatetask,
} from "../../ApiService.tsx/ApiServices";
import { title } from "process";

interface Plan {
  title: string;
  description: string;
  status: string;
  id: number;
}

export default function CreatTask() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  // const [editId, setId] = useState<number>(0);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedId, setEditedId] = useState<number>(0);
  const [editstatus, setEditstatus] = useState("");

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      const response = await getTasks();
      setPlans(response.data.data);
      console.log(plans);
    } catch (error) {}
  };

  const addplans = async () => {
    if (newTitle.trim() !== "") {
      try {
        const response = await createtask(newTitle, newDescription);
        const createdPlan = response.data;
        await getTask();
        setNewTitle("");
        setNewDescription("");
      } catch (error) {}
    }
  };

  // Function to open the edit modal
  const openEditModal = (plan: Plan) => {
    console.log(plan.id);
    setEditstatus(plan.status);
    setEditedTitle(plan.title);
    setEditedDescription(plan.description);
    setEditedId(plan.id);
    setOpenModal(true);
  };
  console.log(editedId);

  // Function to save the edited plan
  const saveEditedPlan = async () => {
    if (editedTitle.trim() !== "") {
      try {
        await updatetask(editedId, editedTitle, editedDescription, editstatus);
        await getTask();
      } catch (error) {}

      setOpenModal(false);
    }
  };

  // Function to delete a plan
  const deletePlan = async (id: number) => {
    try {
      const response = await deletetask(id);
      await getTask();
    } catch (error) {
      alert("error has occured");
    }
  };
  const donestatus = async (plan: Plan) => {
    try {
      const response = await updatetask(
        plan.id,
        plan.title,
        plan.description,
        "done"
      );
      console.log(response.data);
      await getTask();
    } catch (error) {}
  };

  const rejectstatus = async (plan: Plan) => {
    try {
      const response = await updatetask(
        plan.id,
        plan.title,
        plan.description,
        "reject"
      );
    } catch (error) {}
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Container
        sx={{ backgroundColor: "#558000", borderRadius: "10px" }}
        maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            marginTop: "20px",
            padding: "20px",
            borderBottom: "2px solid white",
          }}>
          <Stack direction="row" spacing={2} sx={{ marginTop: "10px" }}>
            <TextField
              inputProps={{
                style: {
                  color: "whitesmoke",
                  fontSize: "16px",
                  fontWeight: "600", // Change the text color here
                },
              }}
              label="Title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{
                marginRight: "10px",
                backgroundColor: "inherit",
                borderBottom: "1px solid white",
                borderLeft: "1px solid white",
                borderRadius: "10px",
                "& .MuiInputLabel-root": {
                  fontSize: "15px",
                  color: "#fff",
                },
                "& fieldset": { border: "none" },
                "& label.Mui-focused": {
                  fontSize: "20px",
                  color: "whitesmoke", // Adjust the font size as needed
                },
              }}
            />
            <TextField
              inputProps={{
                style: {
                  color: "whitesmoke",
                  fontWeight: "600",
                  fontSize: "16px", // Change the text color here
                },
              }}
              label="Description..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              sx={{
                marginRight: "10px",
                backgroundColor: "inherit",
                borderBottom: "1px solid white",
                borderLeft: "1px solid white",
                borderRadius: "10px",
                width: "400px",
                "& .MuiInputLabel-root": {
                  fontSize: "15px",
                  color: "#fff",
                },
                "& fieldset": { border: "none" },
                "& label.Mui-focused": {
                  fontSize: "20px",
                  color: "#fff", // Adjust the font size as needed
                },
                color: "white",
              }}
            />
          </Stack>
          <Box sx={{ width: "40px", height: "20px" }}>
            <Button
              variant="contained"
              onClick={addplans}
              sx={{
                backgroundColor: "#f2f2f2",
                color: "black",

                "&:hover": {
                  backgroundColor: "#EC9704",
                  color: "#fff",
                },
              }}>
              Add
            </Button>
          </Box>
        </Box>

        <List>
          {plans.map((plan, index) => (
            <Paper elevation={5} sx={{ margin: "10px 0" }} key={index}>
              <ListItem>
                <Box>
                  <ListItemText
                    primary={`title : ${plan.title}`}
                    secondary={`status : ${plan.status}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => openEditModal(plan)}
                      sx={{ color: "#004de6" }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deletePlan(plan.id)}
                      sx={{ color: "#ff0000" }}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Box>
              </ListItem>
              <Box>
                <Button onClick={() => donestatus(plan)}>done</Button>
                <Button onClick={() => rejectstatus(plan)}>reject</Button>
              </Box>
            </Paper>
          ))}
        </List>

        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}>
            <TextField
              label="Edit Title"
              fullWidth
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              label="Edit Description"
              fullWidth
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              sx={{ marginBottom: "10px" }}
            />
            <Button
              variant="contained"
              onClick={saveEditedPlan}
              sx={{
                marginRight: "10px",
                background: "#00cc00",
                color: "white",
              }}>
              Save
            </Button>
            <Button
              variant="contained"
              onClick={() => setOpenModal(false)}
              sx={{ backgroundColor: " #e60000", color: "white" }}>
              Cancel
            </Button>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}
