<template>
<main>
    <div class="container-fluid p-2">
        <div class="text-center mt-5" v-if="isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="card mb-4" v-else>
            <!-- <div class="card-header">
            <i class="fas fa-table me-1"></i> DataTable Example
            </div> -->
            <p v-if="isError" class="text-center">Đã có lỗi xảy ra: {{error}}. Vui lòng liên hệ quản trị viên!</p>
            <div v-else class="card-body">
                <div class=" dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns ">
                    <div class="dataTable-top">
                    </div>
                    <div class="table-wrapper">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th v-for="(permission, idx) in getPermissions" :key="idx">{{ permission.name}}</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(role, idx) in getRoles" :key="idx">
                                    <td>{{role.name}}</td>
                                    <td class="fw-bold" v-for="(permission, i) in getPermissions" :key="i">
                                        {{convertIdToName(permissionDetails[idx][i])}}
                                    </td>
                                    <td>
                                        <a href="#" :class="addDisabledClass(role.name)" title="Settings" data-toggle="tooltip"><i :id="role.id" @click="settingRole" class="fas fa-cog"></i></a>
                                        <a href="#" :class="'ms-2 text-danger ' + addDisabledClass(role.name)" title="Delete" data-toggle="tooltip"><i :id="role.id" @click="deleteRole" class="fas fa-user-times"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button v-if="getRoles.length > 0" type="button" class="btn btn-primary" @click="addRole">Add Role</button>
        </div>
    </div>
    <modal-setting-role :modal="modal"/>
    <modal-add-role aria-modal="modal" />
    <modal-delete-role :modal="modal"/>
</main>
</template>

<script>
import dbRequest from '../../apis/dbRequest'
import ModalAddRole from '../modals/ModalAddRole.vue'
import ModalDeleteRole from '../modals/ModalDeleteRole.vue'
import { mapGetters, mapMutations } from 'vuex'
import convert from '../../untils/convert'
import ModalSettingRole from '../modals/ModalSettingRole.vue'

export default {
    name: "ManagerRole",
    components: {
        ModalAddRole,
        ModalDeleteRole,
        ModalSettingRole
    },
    data() {
        return {
            isLoading: true,
            modal: {
                name: "",
                data: {},
                isError: false,
                error: null
            },
            permissionDetails: []
        }
    },
    computed: {
        ...mapGetters(["getUser","getPermissions", "getRoles", "getPermissionDetails"])
    },
    created() {
        document.title = "Role Manager"
        dbRequest.getAllRoles()
            .then((data) => {
                this.isLoading = false
                this.setRoles(data.data)
                data.data.forEach(ele => {
                    this.permissionDetails.push(JSON.parse(ele.permission))
                });
                this.setPermissionDetails(this.permissionDetails)
                return dbRequest.getAllPermissions()
            })
            .then((data) => {
                this.setPermissions(data.data)
            })
            .catch((err) => {
                this.isLoading = false
                this.isError = true
                this.error = err.message
            })
    },
    methods: {
        ...mapMutations(["setPermissions", "setRoles", "setPermissionDetails"]),
        addDisabledClass(roleName) {
            const user = this.getUser
            const username = user.username
            return (roleName == "manager" && username != "thamtc.ifc") ? 'disabled' : ''
        },
        addRole() {
            var myModal = new bootstrap.Modal(document.getElementById('addRoleModal'))
            this.modal.name = myModal
            // if(store.getters.getDataRealtime.length > 0) {
            myModal.show()
        },
        convertIdToName(id){
            return convert.idToName(id?.value ?? 0)
        },
        settingRole(e){
            const id = e.target.id
            const roles = this.getRoles
            const elementFound = roles.find(ele => ele.id == id)
            const roleOrig = JSON.parse(elementFound.permission)
            const permissionOrig = roleOrig.map(ele => ele.name)
            const permissions = this.getPermissions
            const permissionPadd = permissions.map(ele => ele.name)
            // filter
            const permissionFiltered = permissionPadd.filter(ele => !permissionOrig.includes(ele))
            permissionFiltered.forEach(ele => roleOrig.push({name: ele, value: '0'}))
            elementFound.permission = JSON.stringify(roleOrig)
            // merge two array
            var myModal = new bootstrap.Modal(document.getElementById('settingRoleModal'))
            this.modal.name = myModal
            this.modal.data = {roleEle: elementFound}
            myModal.show()
        },
        deleteRole(e){
            const id = e.target.id
            const roles = this.getRoles
            const elementFound = roles.find(ele => ele.id == id)
            var myModal = new bootstrap.Modal(document.getElementById('deleteRoleModal'))
            this.modal.name = myModal
            this.modal.data = {id: id, name: elementFound.name}
            myModal.show()
        }
    },
}
</script>

<style>

</style>
