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
                                    <th>Date Created</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, idx) in getUsers" :key="idx">
                                    <td>{{ idx+1 }}</td>
                                    <td>{{ user.username }}</td>
                                    <td>{{ user.createdAt }}</td>
                                    <td>{{ user.role }}</td>
                                    <td><span class="status text-success">&bull;</span> Active</td>
                                    <td>
                                        <a href="#" :class='"settings " + isDisabled(user.username)' title="Settings" data-toggle="tooltip"><i :id="idx" @click="settingUser" class="fas fa-cog"></i></a>
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
    <ModalSettingUser :modal="modal"></ModalSettingUser>
    <ModalDeleteUser :modal="modal"></ModalDeleteUser>
</main>
</template>

<script>
import dbRequest from '../../apis/dbRequest'
import ModalSettingUser from '../modals/ModalSettingUser.vue'
import ModalDeleteUser from '../modals/ModalDeleteUser.vue'
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: "ManagerUsers",
    components: {
        ModalSettingUser,
        ModalDeleteUser
    },
    data() {
        return {
            isLoading: true,
            modal: "",
            roles: []
        };
    },
    computed: {
        ...mapGetters({getUsers: "getManagerUsers", users: "getManagerUsers", userAuth: "getUser"}),
    },
    created() {
        document.title = "Quản lý User"
        // get all user from DB
        dbRequest.getAllUsers().then((data) => {
                this.setManagerUsers(data.data)
                this.isLoading = false
                return dbRequest.getAllRoles()
            })
            .then((data) => {
                data.data.forEach(ele => {
                    this.roles.push(ele.name)
                });
                this.setRoles(this.roles)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    mounted() {
    },
    methods: {
        ...mapMutations(["setManagerUserInfo", "setManagerUsers", "setRoles"]),
        isDisabled(name) {
            return name === this.userAuth.username ? "" : (name === "thamtc.ifc" ? "disabled" : "")
        },
        settingUser(e) {
            const id = e.target.id
            const users = this.users
            var modalUsername = document.getElementById("inputUsernameModal")
            modalUsername.value = users[id].username
            var modalSelection = document.querySelectorAll(".role")
            const role = this.roles.findIndex((ele) => ele == users[id].role)
            modalSelection[role].setAttribute("selected", "selected")
            var myModal = new bootstrap.Modal(document.getElementById('settingUserModal'))
            this.setManagerUserInfo(users[id])
            this.modal = myModal
            // if(store.getters.getDataRealtime.length > 0) {
            myModal.show()
            // }
        },
        deleteUser(e) {
            const id = e.target.id
            const users = this.users
            var myModal = new bootstrap.Modal(document.getElementById('deleteUserModal'))
            this.setManagerUserInfo(users[id])
            this.modal = myModal
            myModal.show()
        }
    },
};
</script>

<style>
</style>
