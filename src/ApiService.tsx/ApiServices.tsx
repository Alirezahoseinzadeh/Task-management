import axios from "axios";
import { error } from "console";

const instance = axios.create({
    baseURL : "http://192.168.1.2:8985/api/"
})


// instance.interceptors.request.use(
//     (config)=>{
// const token = localStorage.getItem("token");
// if(token){
//     config.headers.Authorization = "Bearer " + token;
// }
// return config
// }, 
// (error)=>{
//     return Promise.reject(error);
// }
// );


instance.interceptors.request.use(
    (config)=>{
        console.log(config)
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = "Bearer "  + token;
        }
        return config
    },
    (error)=>{
        return Promise.reject(error);
    }
    )
export const checkLogin = async (username:string,password:string)=>{
return instance.post("auth/login",{username,password});
}

export const registercheck = async (username:string , password:string , fullname: string)=>{
    return instance.post("auth/register" , {username, fullname, password })
}


export const getTasks  = async ()=>{
    return instance.get("tasks");
}