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
import { createtask, getTasks } from "../../ApiService.tsx/ApiServices";

interface Plan {
  title: string;
  description: string;
  status: string;
  id: number;
}

export default function CreatTask() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [status, setStatus] = useState<"done" | "reject" | "">("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editId, setId] = useState<number>(0);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedIndex, setEditedIndex] = useState<number | null>(null);

  // Function to add a new plan to the list
  // const addPlan = () => {
  //   if (newTitle.trim() !== "") {
  //     setPlans([
  //       ...plans,
  //       { title: newTitle, description: newDescription, status: status },
  //     ]);
  //     setNewTitle("");
  //     setNewDescription("");
  //   }
  // };

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      const response = await getTasks();
      console.log(response.data);
      setPlans(response.data.data);
    } catch (error) {}
  };

  const addplans = async () => {
    if (newTitle.trim() !== "") {
      try {
        const response = await createtask(newTitle, newDescription, status);
        console.log(response);
        const createdPlan = response.data;
        await getTask();
        setNewTitle("");
        setNewDescription("");
      } catch (error) {}
    }
  };

  // Function to open the edit modal
  const openEditModal = (index: number) => {
    const plan = plans[index];
    setEditedTitle(plan.title);
    setEditedDescription(plan.description);
    setEditedIndex(index);
    setOpenModal(true);
  };

  // Function to save the edited plan
  const saveEditedPlan = () => {
    if (editedTitle.trim() !== "") {
      const updatedPlans = [...plans];
      updatedPlans[editedIndex as number] = {
        title: editedTitle,
        description: editedDescription,
        status,
        id: editId,
      };
      setPlans(updatedPlans);
      setOpenModal(false);
    }
  };

  // Function to delete a plan
  const deletePlan = (index: number) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
  };
  const donestatus = (index: number) => {
    const upPlans = plans[index];
    upPlans.status = "done";
    console.log(upPlans);
  };

  const rejectstatus = (index: number) => {
    const upPlans = plans[index];
    upPlans.status = "reject";
    console.log(upPlans);
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
                  <ListItemText primary={`title : ${plan.title}`} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => openEditModal(index)}
                      sx={{ color: "#004de6" }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deletePlan(index)}
                      sx={{ color: "#ff0000" }}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Box>
              </ListItem>
              <Box>
                <Button onClick={() => donestatus(index)}>done</Button>
                <Button onClick={() => rejectstatus(index)}>reject</Button>
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
