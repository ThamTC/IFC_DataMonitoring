import apiRequest from "../apiRequest";
import jwt_decode from "jwt-decode";
import store from "../stores/store";

export const authUser = async (to, from, next) => {
  if (from.name === "login") {
    next();
  }else{
      const isLogged = await apiRequest.isLogged();
      console.log("islogged: ", isLogged);
      if (isLogged?.status === 200) {
        next();
      } else {
        next({ name: "login" });
      }
  }
};

export const isLogged = async (to, from, next) => {
  const isLogged = await apiRequest.isLogged();
  if (isLogged?.status === 200) {
    next({ name: "home" });
  } else {
    next();
  }
};

export const authRole = async () => {};
