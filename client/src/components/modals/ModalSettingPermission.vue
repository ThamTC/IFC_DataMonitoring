<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="settingPermissionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Setting Permission</h5>
            </div>
            <div class="modal-body">
                
                <div class="row" v-for="(permission, idx) in getPermissions" :key="idx">
                    <div class="col-md-6">
                        <span>Permission Name</span>
                        <input disabled :value="permission.name" class="form-control" id="inputPermissionnameModal" type="text" />
                    </div>
                    <div class="col-md-6">
                        <span>Select permission</span>
                        <select :id="permission.name" class="form-select" name="setting_select" @change="clearAlert">
                            <option value="0" :selected="permission.value == 0">Null(default)</option>
                            <option value="1" :selected="permission.value == 1">Read</option>
                            <option value="2" :selected="permission.value == 2">Write</option>
                        </select>
                    </div>
                </div>
            </div>

            <div v-if="isMessage" :class='"alert mx-3 alert-" + type' role="alert">
                {{ message }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                <button v-if="isUpdated" type="button" class="btn btn-primary" @click="updatePermission" >Thay đổi</button>
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
    name: "ModalSettingPermission",
    data() {
        return {
            user: {},
            isUpdated: true,
            isMessage: false,
            message: "",
            permissions: [],
            rolename: "",
            permissionName: ""
        }
    },
    props: ["modal"],
    computed: {
        getPermissions() {
            const permission = this.modal.data?.permission ?? []
            console.log(permission)
            return permission
        },
        getSelected() {

        }
    },
    methods: {
        ...mapMutations(["setPermissionDetails", "updatePermissionOfUser"]),
        clearAlert() {
            this.isMessage = false
        },
        updatePermission() {
            this.isUpdated = false
            const userId = this.modal.data.userId
            document.getElementsByName("setting_select").forEach(ele => {
                this.permissions.push({name: ele.id, value: ele.value})
            })
            const permissionStr = JSON.stringify(this.permissions)
            dbRequest.updatePermission(userId, permissionStr)
            .then(() => {
                this.updatePermissionOfUser(this.permissions)
                this.permissions = []
                this.isMessage = true
                this.type = "success"
                this.message = "Update Permission thành công"
                this.isUpdated = true
            })
            .catch((error) => {
                this.isMessage = true
                this.type = "danger"
                this.message = `Có lỗi xảy ra: ${error.message}`
                this.isUpdated = true
            })
        }
    }
}
</script>

<style>

</style>
