<template>
<main>
    <div class="container-fluid p-2">
        <div class="text-center mt-5" v-if="isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="card mb-4" v-else>
            <p v-if="isError" class="text-center">Đã có lỗi xảy ra: {{error}}. Vui lòng liên hệ quản trị viên!</p>
            <div v-else class="card-body">
                <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                    <div v-if="dataItems.length" class="row mb-3">
                        <div class="input-group date justify-content-end" id="datepicker">
                            <input type="date" class="col-md-1" id="startdate" v-model="dateSelection" />
                        </div>
                    </div>
                    <div class="table-wrapper">
                        <table class="table-ifc table-light table-ifc-hover" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr id="0" class="text-center">
                                    <th style="width:5%">#</th>
                                    <th style="width:5%">Status</th>
                                    <th style="width:75%">Subject</th>
                                    <th style="width:15%">Updateded</th>
                                    <!-- <th>Start Date</th>
                                    <th>Due Date</th>
                                    <th>UpdatedDate</th>
                                    <th>Added by</th>
                                    <th>Assignee</th> -->
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <nav v-if="dataItems.length" aria-label="Page navigation">
                        <ul class="pagination mt-3 justify-content-center">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" class="btn btn-primary" @click="addIssue">Add Issue</button>
        </div>
    </div>
    <modal-add-issue :modal="modal" />
</main>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import dbRequest from '../../apis/dbRequest'
import ModalAddIssue from '../modals/ModalAddIssue.vue'
export default {
    components: {
        ModalAddIssue
    },
    name: "RedmineIssues",
    data() {
        return {
            isLoading: false,
            isError: false,
            error: null,
            modal: {
                name: null,
                authName: null,
                users: []
            },
            dateSelection: null,
        }
    },
    computed: {
        ...mapGetters(["getIssues", "getManagerUsers", "getUser"]),
        dataItems() {
            return this.getIssues
        }
    },
    created() {
        this.dateSelection = new Date().toISOString().slice(0, 10)
        this.isLoading = true
        this.getAllIssue()
        .then(result => {
            this.setIssues(result.data)
            return dbRequest.getAllUsers()
        })
        .then((data) => {
            this.setManagerUsers(data.data)
            this.isLoading = false
        })
        .catch(error => {
            this.isError = true
            this.error = error
        })
    },
    methods: {
        ...mapMutations(["setIssues", "setManagerUsers"]),
        ...mapActions(["getAllIssue"]),
        addIssue() {
            var myModal = new bootstrap.Modal(document.getElementById('addIssueModal'))
            this.modal.name = ""
            this.modal.authName = this.getUser.username
            this.modal.users = this.getManagerUsers.map(ele => {return {id: ele.id, name: ele.username}})
            myModal.show()
        }
    },
}
</script>

<style>

</style>
