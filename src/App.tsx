import { Box } from "@mui/material";
import React from "react";
import SignUp from "./Pages/sign/SignUp";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignIn from "./Pages/Login/Login";
import TaskManage from "./Pages/Taskmng/TaskManage";
import CreatTask from "./Pages/CreateTask/CreatTask";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/task-mng" element={<TaskManage />} />
        <Route path="/creat-task" element={<CreatTask />} />
      </Routes>
    </Box>
  );
}

export default App;
