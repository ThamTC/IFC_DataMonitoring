<template>
<main>
    <div class="container-fluid p-2 d-flex justify-content-center">
        <div class="card p-3 min-width">
            <h5 class="mb-3 m-auto">Change Password</h5>
            <Form action="" @submit="submit" method="post" :validation-schema="schema">
                <div class="form-group">
                    <label class="form-label">Old Password</label>
                    <Field name="password" type="password" class="form-control mb-2" v-model="oldPassword" />
                </div>
                <ErrorMessage name="password" class="help-message" />
                <div class="form-group">
                    <label class="form-label">New Password</label>
                    <Field name="newPassword" @input="clearAlert" type="password" class="form-control mb-2" v-model="newPassword" />
                </div>
                <ErrorMessage name="newPassword" class="help-message" />
                <div class="form-group">
                    <label class="form-label">New Password Confirmation</label>
                    <Field name="passwordConfirmation" @input="clearAlert" type="password" class="form-control mb-3" v-model="passwordConfrimation" />
                </div>
                <ErrorMessage name="passwordConfirmation" class="help-message" />
                <div v-if="isMessage" :class='"alert alert-" + type' role="alert">
                    {{ message }}
                </div>
                <div class="text-end">
                    <button v-if="isChange" type="submit" class="btn btn-primary col-3">Change</button>
                    <button v-else class="btn btn-primary" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Chờ tí...
                    </button>
                </div>
            </Form>
        </div>

    </div>

</main>
</template>

<script>
import {
    Form,
    Field,
    ErrorMessage
} from 'vee-validate'
import * as yup from 'yup';
import authRequest from "../../apis/authRequest"
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex';

export default {
    name: "ChangePassword",
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        const schema = yup.object({
            password: yup.string().required('Không được để trống').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
            newPassword: yup.string().notOneOf([yup.ref('password'), null], 'Không được giống mật khẩu cũ').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
            passwordConfirmation: yup.string()
                .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không giống nhau')
        })
        return {
            schema,
            oldPassword: "",
            newPassword: "",
            passwordConfrimation: "",
            isMessage: false,
            message: "",
            type: "",
            isChange: true,
        }
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    methods: {
        ...mapMutations(["setUser", "setIsLoggin"]),
        ...mapActions(["signout"]),
        clearAlert() {
            this.isMessage = false
        },
        showAlert(type, message) {
            this.isMessage = true
            this.message = message
            this.type = type
        },
        submit() {
            this.isChange = false
            const user = this.getUser
            const email = user.email
            authRequest.changePassword(email, this.oldPassword, this.newPassword)
                .then((result) => {
                    this.isChange = true
                    this.showAlert("success",result.data)
                    this.signout()
                        .then(() => {
                            setTimeout(() => {
                                this.setUser({});
                                this.setIsLoggin(false);
                                this.$router.push({
                                    name: "dashboard"
                                })
                            }, 2000);
                        })
                        .catch(err => {
                            this.isChange = true
                            this.showAlert("danger", err.response.data)
                        })
                }).catch((err) => {
                    this.isChange = true
                    this.showAlert("danger", err.response.data)
                });
        }
    },
}
</script>

<style>
.min-width {
    min-width: 25rem;
}

.align_self-end {
    align-self: end;
}
</style>
