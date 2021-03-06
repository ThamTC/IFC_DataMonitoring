import authRequest from "../apis/authRequest";
import store from "../store";
export const authUser = async (to, from, next) => {
  if (from.name === "login") {
    next();
  }else{
      const isLogged = await authRequest.isLogged();
      if (isLogged?.status === 200) {
        next();
      } else {
        next({ name: "login", query:{redirect: to.name}});
      }
  }
};

export const isLogged = async (to, from, next) => {
  const isLogged = await authRequest.isLogged();
  if (isLogged?.status === 200) {
    next({ name: "home" });
  } else {
    next();
  }
};

export const authRole = async () => {};
