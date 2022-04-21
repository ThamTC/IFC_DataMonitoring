import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import Password from '../components/auth/Password.vue'
import { isLogged } from '../middlewares/authBasic'

export default [
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: isLogged,
  },
  {
    path: "/password",
    name: "password",
    component: Password,
    beforeEnter: isLogged,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    beforeEnter: isLogged,
  },
];
