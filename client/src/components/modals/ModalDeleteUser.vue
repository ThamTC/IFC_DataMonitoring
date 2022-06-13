<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">User Setting</h5>
            </div>
            <div class="modal-body">
                <span>Vui lòng nhập mật khẩu xác nhận</span>
                <div class="form-floating mb-3">
                    <input @input="clearAlert" name="password" class="form-control" id="inputPasswordModal" type="pasword" v-model="password" />
                    <label for="inputUsernameModal">password</label>
                </div>
            </div>

            <div v-if="isMessage" :class='"alert mx-3 alert-" + type' role="alert">
                {{ message }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                <button v-if="isUpdated" type="button" class="btn btn-primary" @click="deleteUser" :disabled="isDisabled">Xóa User</button>
                <button v-else class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Chờ tí...
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import dbRequest from '../../apis/dbRequest'
import { mapActions } from "vuex";

export default {
    name: "ModalDeleteUser",
    data() {
        return {
            isUpdated: true,
            isMessage: false,
            message: "",
            type: "",
            password: "",
            isDisabled: false
        }
    },
    props: ["modal"],
    methods: {
        ...mapActions(["deleteUserFromManager"]),
        clearAlert() {
            this.isMessage = false
        },
        deleteUser() {
            // get password from input
            const password = this.password
            if (password === process.env.VUE_APP_CONFIR_PWD_DEL_USER ?? "") {
                // xoa user neu mat khau dung
                dbRequest.deleteUser(this.modal.data.user)
                .then(() => {
                    this.isMessage = true
                    this.type = "success"
                    this.message = "Xóa User thành công"
                    // update users in managerStore
                    this.deleteUserFromManager(this.modal.data.eleId)
                    this.isDisabled = true
                })
                .catch((error) => {
                    this.isMessage = true
                    this.type = "danger"
                    // this.message = "Thất bại trong quá trình tương tác với DB"
                    this.message = error
                })
            }
            else {
                this.isMessage = true
                this.type = "danger"
                this.message = "Mật khẩu không đúng"
            }
        },
    },
    mounted() {},
}
</script>

<style>

</style>
