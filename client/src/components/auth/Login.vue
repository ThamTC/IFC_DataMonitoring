<template>
<div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
        <main>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5">
                        <div class="card shadow-lg border-0 rounded-lg mt-5">
                            <div class="card-header">
                                <h3 class="text-center font-weight-light my-4">Login</h3>
                                <div class="text-center message-err">{{ message }}</div>
                            </div>
                            <div class="card-body">
                                <Form action="" @submit="submit" method="post" :validation-schema="schema">
                                    <div class="form-floating mb-3">
                                        <Field name="email" class="form-control" id="inputEmail" type="email" placeholder="name@example.com" v-model="user.email" />
                                        <label for="inputEmail">Email address</label>
                                    </div>
                                    <ErrorMessage name="email" class="help-message" />
                                    <div class="form-floating mb-3">
                                        <Field name="password" class="form-control" id="inputPassword" type="password" placeholder="Password" v-model="user.password" />
                                        <label for="inputPassword">Password</label>
                                    </div>
                                    <ErrorMessage name="password" class="help-message" />
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                        <label class="form-check-label" for="inputRememberPassword">Remember Password</label>
                                    </div>
                                    <div class="
                        d-flex
                        align-items-center
                        justify-content-between
                        mt-4
                        mb-0
                      ">
                                        <router-link to="/password">Forgot Password?</router-link>
                                        <button v-if="isLogged" class="btn btn-primary" type="submit">
                                            Login
                                        </button>
                                        <button v-else class="btn btn-primary" type="button" disabled>
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Chờ tí...
                                        </button>
                                    </div>
                                </Form>
                            </div>
                            <div class="card-footer text-center py-3">
                                <div class="small">
                                    <router-link to="/register">Need an account? Sign up!</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import Footer from "../Footer.vue";
import {
    mapActions, mapGetters, mapMutations
} from "vuex";
import {
    Form,
    Field,
    ErrorMessage
} from 'vee-validate'
import * as yup from 'yup';

export default {
    name: "Login",
    components: {
        Footer,
        Form,
        Field,
        ErrorMessage
    },
    data() {
        const schema = yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(6),
        })
        return {
            schema,
            user: {
                email: "",
                password: "",
            },
            showError: false,
            message: "",
            isLogged: true
        }
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    created() {
        document.title = "Đăng nhập"
    },
    methods: {
        ...mapActions(["signin"]),
        routeDefault() {
            const user = this.getUser
            const permissions = user.permissions
            const eleFound = permissions.find(ele => ele.value > 0)
            if (eleFound !== undefined) {
                return eleFound.name
            }
            return "default"
        },
        submit() {
            this.isLogged = false
            this.signin(this.user).then(resData => {
                this.isLogged = true
                const redirectPath = this.$route.query.redirect
                this.$router.push({
                    name: redirectPath ?? "home",
                    query: {routeDefault: this.routeDefault()}
                });
            })
        },
    },
};
</script>

<style>
.help-message {
    display: block;
    color: red;
    margin-top: -15px;
    margin-bottom: 15px;
}
</style>
