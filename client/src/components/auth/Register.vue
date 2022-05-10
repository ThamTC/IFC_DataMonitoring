<template>
<div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
        <main>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-7">
                        <div class="card shadow-lg border-0 rounded-lg mt-5">
                            <div class="card-header">
                                <h3 class="text-center font-weight-light my-4">
                                    Create Account
                                </h3>
                                <div class="text-center message-err">{{ messageErr }}</div>
                            </div>
                            <div class="card-body">
                                <Form action="" @submit="submit" method="post" :validation-schema="schema">
                                    <div class="form-floating mb-3">
                                        <Field name="name" class="form-control" id="inputName" type="text" placeholder="Enter your name" v-model="user.username" />
                                        <label for="inputName">Name</label>
                                    </div>
                                    <ErrorMessage name="name" class="help-message" />

                                    <div class="form-floating mb-3">
                                        <Field name="email" class="form-control" id="inputEmail" type="email" placeholder="name@example.com" v-model="user.email" />
                                        <label for="inputEmail">Email address</label>
                                    </div>
                                    <ErrorMessage name="email" class="help-message" />
                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <Field name="password" class="form-control" id="inputPassword" type="password" placeholder="Create a password" v-model="user.password" />
                                                <label for="inputPassword">Password</label>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <Field name="confirm_password" class="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" v-model="user.pwdConfirmation" />
                                                <label for="inputPasswordConfirm">Confirm Password</label>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <ErrorMessage name="password" class="help-message"/>
                                        </div>
                                        <div class="col-md-6">
                                            <ErrorMessage name="confirm_password" class="help-message"/>
                                        </div>
                                    </div>

                                    <div class="mt-4 mb-0">
                                        <div class="d-grid">
                                            <button v-if="isRegister" class="btn btn-primary btn-block" type="submit">Create Account</button>
                                            <button v-else class="btn btn-primary" type="button" disabled>
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Chờ tí...
                                        </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                            <div class="card-footer text-center py-3">
                                <div class="small">
                                    <router-link to="/login">
                                        Have an account? Go to login</router-link>
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
import authRequest from "../../apis/authRequest";
import {
    Form,
    Field,
    ErrorMessage
} from 'vee-validate'
import * as yup from 'yup';
export default {
    name: "Register",
    components: {
        Footer,
        Form,
        Field,
        ErrorMessage
    },
    data() {
        const schema = yup.object({
            name: yup.string().required().min(2).max(20),
            email: yup.string().email().required(),
            password: yup.string().min(6).required(),
            confirm_password: yup.string()
                .required()
                .oneOf([yup.ref("password")], "Passwords do not match"),
        });
        return {
            schema,
            user: {
                username: "",
                email: "",
                password: "",
                pwdConfirmation: "",
            },
            messageErr: "",
            isRegister: true
        };
    },
    created() {
        document.title = "Đăng ký tài khoản"
    },
    methods: {
        submit() {
            this.isRegister = false
            authRequest
                .register(this.user)
                .then((res) => {
                    this.isRegister = true
                    this.$router.push("/login");
                })
                .catch((err) => {
                    this.isRegister = true
                    this.messageErr = err.response.data;
                });
        },
    },
};
</script>

<style></style>
