import axios from "axios";

const instance = axios.create({
  baseURL: "https://taskapi.developiha.ir/api/",
});

instance.interceptors.request.use(
  (config) => {
    console.log(config);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const checkLogin = async (username: string, password: string) => {
  return instance.post("auth/login", { username, password });
};

export const registercheck = async (
  username: string,
  password: string,
  fullname: string
) => {
  return instance.post("auth/register", { username, fullname, password });
};

export const getTasks = async () => {
  return instance.get("tasks");
};

export const createtask = async (title: string, description: string) => {
  return instance.post("tasks", {
    title,
    description,
  });
};

export const updatetask = async (
  id: number,
  title: string,
  description: string,
  status: string
) => {
  return instance.put(`tasks/${id}`, {
    title,
    description,
    status,
    id,
  });
};

export const deletetask = async (id: number) => {
  return instance.delete(`tasks/${id}`);
};
