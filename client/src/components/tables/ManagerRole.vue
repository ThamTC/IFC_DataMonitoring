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
                                    <th>Name</th>
                                    <th v-for="(permission, idx) in getPermissions" :key="idx">{{ permission.name}}</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(role, idx) in roles" :key="idx">
                                    <td>{{role.name}}</td>
                                    <td class="fw-bold" v-for="(detail, i) in permissionDetails" :key="i">
                                        {{convertIdToName(permissionDetails[idx][i])}}
                                    </td>
                                    <td>
                                        <a href="#" title="Settings" data-toggle="tooltip"><i :id="idx" @click="settingUser" class="fas fa-cog"></i></a>
                                        <a href="#" class="text-danger" title="Delete" data-toggle="tooltip"><i :id="idx" @click="deleteUser" class="fas fa-user-times"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button v-if="roles.length > 0" type="button" class="btn btn-primary" @click="addRole">Add Role</button>
        </div>
    </div>
    <modal-add-role aria-modal="modal" />
</main>
</template>

<script>
import dbRequest from '../../apis/dbRequest'
import ModalAddRole from '../modals/ModalAddRole.vue'
import { mapGetters, mapMutations } from 'vuex'
import convert from '../../untils/convert'

export default {
    name: "ManagerRole",
    components: {
        ModalAddRole
    },
    data() {
        return {
            isLoading: true,
            roles: [],
            modal: "",
            permissionDetails: []
        }
    },
    computed: {
        ...mapGetters(["getPermissions"])
    },
    created() {
        document.title = "Quản lý Role"
        dbRequest.getAllRoles()
            .then((data) => {
                this.isLoading = false
                this.roles = data.data
                this.roles.forEach(ele => {
                    this.permissionDetails.push(JSON.parse(ele.permission))
                });
                return dbRequest.getAllPermissions()
            })
            .then((data) => {
                this.setPermissions(data.data)
            })
            .catch((error) => console.log(error))
    },
    methods: {
        ...mapMutations(["setPermissions"]),
        
        addRole() {
            var myModal = new bootstrap.Modal(document.getElementById('addRoleModal'))
            this.modal = myModal
            // if(store.getters.getDataRealtime.length > 0) {
            myModal.show()
        },
        convertIdToName(id){
            // console.log(convert.idToName(id.value))
            return convert.idToName(id.value)
        }
    },
}
</script>

<style>

</style>
