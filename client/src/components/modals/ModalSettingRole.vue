<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="settingRoleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Setting Role</h5>
            </div>
            <div class="modal-body">
                <div class="row justify-content-center mb-2">
                    <div class="col-md-6">
                        <span>User Name</span>
                        <input disabled :value="getUserName" class="form-control" id="inputPermissionnameModal" type="text" />
                    </div>
                    <div class="col-md-6">
                        <span>Select Role</span>
                        <select class="form-select" id="setting_select" @change="clearAlert">
                            <option v-for="(role, idx) in getTotalRoles" :key="idx" :selected="role.name == getRoleName">{{role.name}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div v-if="isMessage" :class='"alert mx-3 alert-" + type' role="alert">
                {{ message }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                <button v-if="isUpdated" type="button" class="btn btn-primary" @click="updateRole" >Thay đổi</button>
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
import { mapActions, mapMutations } from 'vuex'
import dbRequest from '../../apis/dbRequest/index'

export default {
    name: "ModalDeleteUser",
    data() {
        return {
            user: {},
            isUpdated: true,
            isMessage: false,
            message: "",
            permissions: [],
            rolename: "",
            permissionName: "",
            selectedRole: null
        }
    },
    props: ["modal"],
    computed: {
        getUserName() {
            return this.modal.data?.username ?? ""
        },
        getTotalRoles() {
            return this.modal.data?.roleTotal ?? []
        },
        getRoleName() {
            return this.modal.data?.roleName ?? ""
        },
    },
    methods: {
        ...mapMutations(["setPermissionDetails"]),
        ...mapActions(["updateRoles", "updatePermissionDetails"]),
        clearAlert() {
            this.isMessage = false
        },
        updateRole() {
            this.isUpdated = false
            const eleId = this.modal.data.eleId
            const userId = this.modal.data.userId
            const selectionEle = document.getElementById("setting_select")
            const roleStr = JSON.stringify(selectionEle.value)
            dbRequest.updateRole(userId, selectionEle.value)
            .then(() => {
                this.updateRoles({eleId: eleId, roleName: selectionEle.value})
                // this.updatePermissionDetails({name: roleName, data: this.permissions})
                this.permissions = []
                this.isMessage = true
                this.type = "success"
                this.message = "Update Role thành công"
                this.isUpdated = true
            })
            .catch((error) => {
                this.isMessage = true
                this.type = "danger"
                this.message = "Thất bại trong quá trình tương tác với DB"
                this.isUpdated = true
            })
        }
    }
}
</script>

<style>

</style>