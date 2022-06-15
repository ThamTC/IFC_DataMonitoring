<template>
<main>
    <div class="container-fluid p-2">
        <div class="d-flex">
            <span class="fw-bold flex-grow-1">Issue#{{issue.id}}</span>
            <a href="#" @click="updateIssue" class="text-decoration-none text-primary"><i class="far fa-edit text-orange"></i>Update</a>
        </div>
        <hr>
        <div class="card my-1 bg-yellow">
            <div class="card-body">
                <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                    <div class="d-flex">
                        <div>
                            <img src="/assets/images/monitor.png" alt="Avatar" class="d-block ui-w-80">
                        </div>
                        <div class="flex-grow-1 mx-3">
                            <div class="subject">{{issue.subject}}</div>
                            <div class="author">Added By {{issue.addedBy}}</div>
                        </div>
                        <div class="small">
                            <nav style="--bs-breadcrumb-divider: '|';" aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#" class="text-decoration-none">Previous</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Next</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <table class="table table-borderless table-sm mt-3">
                        <tbody>
                            <tr>
                                <th>Status:</th>
                                <td>{{issue.status}}</td>
                                <th>Start Date:</th>
                                <td>{{issue.startDate}}</td>
                            </tr>
                            <tr>
                                <th>Priority:</th>
                                <td>{{issue.priority}}</td>
                                <th>Due Date:</th>
                                <td>{{issue.dueDate}}</td>
                            </tr>
                            <tr>
                                <th>Assignee:</th>
                                <td>{{issue.assignee}}</td>
                                <th>% Done:</th>
                                <td>
                                    <div class="progress w-25">
                                        <div class="progress-bar bg-success" role="progressbar" :style="'width: '+issue.doneProgress+'%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{issue.doneProgress}}%</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>
                    <span class="fw-bold">Description</span>
                    <br>
                    <span class="mx-3">{{issue.description}}</span>
                </div>
            </div>

        </div>
        <!-- <button type="button" class="btn btn-secondary" :disabled="true">Submit Change</button> -->
    </div>
    <modal-update-issue :modal="modal" />
</main>
</template>

<script>
import {
    mapGetters, mapMutations
} from 'vuex'
import dbRequest from '../../apis/dbRequest'
import ModalUpdateIssue from '../modals/ModalUpdateIssue.vue'
export default {
    name: "IssueDetail",
    components: {
        ModalUpdateIssue
    },
    data() {
        return {
            issue: {},
            modal: {
                name: null,
                data: {}
            }
        }
    },
    computed: {
        ...mapGetters(["getIssues", "getManagerUsers"]),
    },
    created() {
        const params = this.$route.params
        const id = params.id
        const issues = this.getIssues
        if (issues.length) {
            this.issue = issues[id - 1]
            this.issue.startDate = this.issue.startDate.slice(0, 10)
            this.issue.dueDate = this.issue.dueDate.slice(0, 10)
            this.issue.id = issues[id - 1].id
        } else {
            dbRequest.getIssueIndex(id)
                .then(result => {
                    this.issue = result.data
                    return dbRequest.getAllUsers()
                })
                .then(result => {
                    this.setManagerUsers(result.data)
                    this.issue.startDate = this.issue.startDate.slice(0, 10)
                    this.issue.dueDate = this.issue.dueDate.slice(0, 10)
                })
                .catch(error => console.log(error))
        }
    },
    methods: {
        ...mapMutations(["setManagerUsers"]),
        mapUsers() {
            return this.getManagerUsers.map(ele => {
                return {
                    id: ele.id,
                    name: ele.username
                }
            })
        },
        updateIssue() {
            var myModal = new bootstrap.Modal(document.getElementById('updateIssueModal'))
            this.modal.name = ""
            this.issue.dueDate = this.issue.dueDate.slice(0, 10)
            this.issue.startDate = this.issue.startDate.slice(0, 10)
            this.modal.data = this.issue
            this.modal.users = this.mapUsers()
            myModal.show()
        }
    }
}
</script>

<style>
.bg-yellow {
    background-color: #ffffdd;
}
</style>
