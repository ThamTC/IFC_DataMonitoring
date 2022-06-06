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

            <div class="card-body">
                <div class=" dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns ">
                    <div class="dataTable-top">
                    </div>
                    <div class="table-wrapper">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(role, idx) in getRoles" :key="idx">
                                    <td>{{idx}}</td>
                                    <td>
                                        {{role.name}}
                                    </td>
                                    <td>
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
            <button type="button" class="btn btn-primary" @click="addRole">Add Role</button>
        </div>
    </div>
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
            // isLoading: true,
            modal: {
                name: "",
                data: {}
            },

        }
    },
    computed: {
        ...mapGetters(["getUser","getPermissions", "getRoles", "getPermissionDetails"])
    },
    created() {
        document.title = "Role Manager"
        if (this.getRoles.length == 0) {
            dbRequest.getAllRoles()
                .then((data) => {
                    this.isLoading = false
                    const roles = data.data.map(ele => {return {
                        id: ele.id,
                        name: ele.name
                    }})
                    this.setRoles(roles)
                })
                .catch((error) => console.log(error))
        } else {
            this.isLoading = false
        }
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
        deleteRole(e){
            const id = e.target.id
            var myModal = new bootstrap.Modal(document.getElementById('deleteRoleModal'))
            this.modal.name = myModal
            this.modal.data = {id: id}
            myModal.show()
        }
    },
}
</script>

<style>

</style>