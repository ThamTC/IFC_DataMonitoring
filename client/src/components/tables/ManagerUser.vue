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
            <div class="card-body" v-else>
                <div class=" dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns ">
                    <div class="dataTable-top">
                        <!-- <div class="dataTable-dropdown">
                        <label>
                            <select class="dataTable-selector">
                                <option value="5">5</option>
                                <option value="10" selected="">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                            </select>
                        entries per page
                        </label>
                    </div>
                    <div class="dataTable-search">
                        <input class="dataTable-input" placeholder="Search..." type="text">
                    </div> -->
                    </div>
                    <div class="table-wrapper">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Date Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, idx) in getUsers" :key="idx">
                                    <td>{{ idx+1 }}</td>
                                    <td>{{ user.username }}</td>
                                    <td>{{ user.role }}</td>
                                    <td><span class="status text-success">&bull;</span> Active</td>
                                    <td>{{ user.createdAt }}</td>
                                    <td>
                                        <a href="#" :class='"settings " + isDisabled(user.username)' title="Setting User" data-toggle="tooltip"><i :id="idx" @click="settingRole" class="fas fa-cog"></i></a>
                                        <a href="#" :class='"ms-2 settings " + isDisabled(user.username)' title="Setting Permission" data-toggle="tooltip"><i :id="idx" @click="settingPermission" class="fas fa-cog"></i></a>
                                        <a href="#" :class='"ms-2 text-danger delete " + isDisabled(user.username) ' title="Delete" data-toggle="tooltip"><i :id="idx" @click="deleteUser" class="fas fa-user-times"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-setting-role :modal="modal" />
    <modal-delete-user :modal="modal" />
    <modal-setting-permission :modal="modal" />
</main>
</template>

<script>
import dbRequest from '../../apis/dbRequest'
import ModalSettingUser from '../modals/ModalSettingUser.vue'
import ModalDeleteUser from '../modals/ModalDeleteUser.vue'
import {
  mapActions,
    mapGetters,
    mapMutations
} from 'vuex';
import ModalSettingPermission from '../modals/ModalSettingPermission.vue';
import ModalSettingRole from '../modals/ModalSettingRole.vue';

export default {
    name: "ManagerUsers",
    components: {
        ModalSettingUser,
        ModalDeleteUser,
        ModalSettingPermission,
        ModalSettingRole
        },
    data() {
        return {
            isLoading: true,
            modal: {
                name: null,
                data: null
            },
            roles: [],
            isError: false,
            error: null
        };
    },
    computed: {
        ...mapGetters({
            getUsers: "getManagerUsers",
            users: "getManagerUsers",
            userAuth: "getUser",
            getRoles: "getRoles"
        }),
    },
    created() {
        document.title = "User Manager"
        // get all user from DB
        dbRequest.getAllUsers().then((data) => {
                this.setManagerUsers(data.data)
                return dbRequest.getAllRoles()
            })
            .then((data) => {
                console.log(data)
                this.isLoading = false
                var result = [];
                data.data.forEach(function (item) {
                    if (result.indexOf(item.role) < 0) {
                        result.push(item.role);
                    }
                });
                this.setRoles(result)
            })
            .catch((err) => {
                this.isLoading = false
                this.isError = true
                this.error = err.message
            })
    },
    mounted() {},
    methods: {
        ...mapMutations(["setManagerUserInfo", "setManagerUsers", "setRoles"]),
        ...mapActions(["getPermissionOfUser"]),
        isDisabled(name) {
            return name === this.userAuth.username ? "" : (name === "thamtc.ifc" ? "disabled" : "")
        },
        settingRole(e) {
            const users = this.getUsers
            const userId = users[e.target.id].id
            const id = e.target.id
            const user = this.userAuth
            const roleName = this.getUsers[id].role
            var myModal = new bootstrap.Modal(document.getElementById('settingRoleModal'))
            this.modal.name = myModal
            this.modal.data = {
                userId: userId,
                eleId: id,
                username: user.username,
                roleName: roleName,
                roleTotal: this.getRoles
            }
            // if(store.getters.getDataRealtime.length > 0) {
            myModal.show()
        },
        settingPermission(e) {
            const users = this.getUsers
            const userId = users[e.target.id].id
            var myModal = new bootstrap.Modal(document.getElementById('settingPermissionModal'))
            this.modal.name = myModal
            this.getPermissionOfUser(userId)
            .then(res => {
                
                var permission
                if (res.data === null) {
                    permission = this.userAuth.permissions
                } else {
                    permission = JSON.parse(res.data.permission)
                }
                this.modal.data = {
                    userId: userId,
                    permission: permission
                }
                myModal.show()
            })
            .catch()
        },
        deleteUser(e) {
            const id = e.target.id
            const users = this.users
            var myModal = new bootstrap.Modal(document.getElementById('deleteUserModal'))
            this.modal.name = myModal
            this.modal.data = {userId: users[id].id, eleId: id}
            myModal.show()
        }
    },
};
</script>

<style>
</style>
