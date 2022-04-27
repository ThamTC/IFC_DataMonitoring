import authRequest from "../apis/authRequest";
import store from '../stores/store'

export const authUser = async (to, from, next) => {
  if (from.name === "login") {
    next();
  }else{
      const isLogged = await authRequest.isLogged();
      if (isLogged?.status === 200) {
        store.commit("setSideNavContent", to.name)
        next();
      } else {
        next({ name: "login", query:{redirect: "account"}});
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
