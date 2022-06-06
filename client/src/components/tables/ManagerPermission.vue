<template>
<main>
    <div class="container-fluid p-2">
        <div class="text-center mt-5" v-if="isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
            <div class="card mb-4">
                <p v-if="isError" class="text-center">Đã có lỗi xảy ra: {{error}}. Vui lòng liên hệ quản trị viên!</p>
                <div v-else class="card-body">
                    <div class=" dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns ">
                        <div class="dataTable-top">
                        </div>
                        <div class="table-wrapper">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Permission</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(permission, idx) in getPermissions" :key="idx">
                                        <td>{{idx}}</td>
                                        <td>{{permission.name}}</td>
                                        <td>
                                            <a href="#" class="ms-2 text-danger" title="Delete" data-toggle="tooltip"><i :id="idx" @click="deletePermission" class="fas fa-user-times"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-primary" @click="addPermission">Add Permission</button>
            </div>
        </div>
    </div>
    <modal-add-permission />
</main>
</template>

<script>
import {
    mapGetters,
    mapMutations
} from 'vuex'
import dbRequest from '../../apis/dbRequest'
import permissionRequest from '../../apis/dbRequest/permissionRequest'
import ModalAddPermission from '../modals/ModalAddPermission.vue'
export default {
    name: "ManagerPermission",
    components: {
        ModalAddPermission
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
        }
    },
    computed: {
        ...mapGetters(["getPermissions"]),
    },
    created() {
        document.title = "Permission Manager"
        dbRequest.getAllPermissions()
            .then((data) => {
                const result = data.data.map(ele => {
                    return {
                        id: ele.id,
                        name: ele.name
                    }
                })
                this.setPermissions(result)
                this.isLoading = false
                this.isError = false
            })
            .catch(err => {
                this.isLoading = false
                this.isError = true
                this.error = err.message
            })
    },
    methods: {
        ...mapMutations(["setPermissions"]),
        addPermission() {
            var myModal = new bootstrap.Modal(document.getElementById('addPermissionModal'))
            this.modal.name = myModal
            myModal.show()
        },
        deletePermission(e) {
            const permissions = this.getPermissions
            const permissionId = permissions[e.target.id].id
            permissionRequest.delete(permissionId)
            .then(() => {
                const permRemoved = permissions.filter(ele => ele.id != permissionId)
                this.setPermissions(permRemoved)
                this.isError = false
            })
            .catch(err => {
                    this.isError = true
                    this.error = err.message
            })
        }
    },

}
</script>

<style>

</style>
