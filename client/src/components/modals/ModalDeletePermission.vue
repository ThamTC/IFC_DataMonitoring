<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="deletePermissionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delete Permission</h5>
            </div>
            <div class="modal-body">
                <span>Vui lòng nhập mật khẩu xác nhận</span>
                <div class="form-floating mb-3">
                    <input @input="clearAlert" name="password" class="form-control" id="inputPasswordModal" type="pasword" v-model="password" />
                    <label for="inputPermissionnameModal">password</label>
                </div>
            </div>

            <div v-if="isMessage" :class='"alert mx-3 alert-" + type' role="alert">
                {{ message }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                <button v-if="isUpdated" type="button" class="btn btn-primary" @click="deletePermission" :disabled="isDisabled">Xóa Role</button>
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
import permissionRequest from '@/apis/dbRequest/permissionRequest'
import {
    mapGetters, mapMutations
} from 'vuex'

export default {
    name: "ModalDeletePermission",
    data() {
        return {
            Role: {},
            isUpdated: true,
            isMessage: false,
            message: "",
            type: "",
            password: "",
            isDisabled: false
        }
    },
    props: ["modal"],
    computed: {
        ...mapGetters(["getPermissions"]),
    },
    methods: {
        ...mapMutations(["setPermissions"]),
        clearAlert() {
            this.isMessage = false
        },
        deletePermission() {
            const id = this.modal.data.id
            // get password from input
            const password = this.password
            if (password === process.env.VUE_APP_CONFIR_PWD_DEL_USER ?? "") {
                // xoa user neu mat khau dung
                const permissions = this.getPermissions
                const permissionId = permissions[id].id
                permissionRequest.delete(permissionId)
                    .then(() => {
                        const permRemoved = permissions.filter(ele => ele.id != permissionId)
                        this.setPermissions(permRemoved)
                        this.isMessage = true
                        this.type = "success"
                        this.message = "Đã xóa Permission thành công"
                    })
                    .catch(err => {
                        this.isMessage = true
                        this.type = "danger"
                        this.message = err.message
                    })
            } else {
                this.isMessage = true
                this.type = "danger"
                this.message = "Mật khẩu không đúng"
            }
        },
    },
}
</script>

<style>

</style>
