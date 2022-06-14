<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="updateIssueModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Adding Issue</h5>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <span>Status</span>
                        <select name="" id="status_select" class="form-select">
                            <option :value="status" v-for="(status, idx) in optionStatus" :key="idx" :selected="status==getIssue.status">{{status}}</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <span>% Done</span>
                        <select name="" id="done_select" class="form-select">
                            <option :value="done" v-for="(done, idx) in optionDone" :key="idx" :selected="done==getIssue.doneProgress">{{done}}%</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <span>Added by</span>
                        <input type="text" class="form-control" v-model="issueFormData.addedBy" disabled />
                    </div>
                    <div class="col-md-6">
                        <span>Assignee</span>
                        <select name="" id="assignee_select" class="form-control">
                            <option :value="user.name" v-for="(user, idx) in getUsers" :key="idx" :selected="user.name==getIssue.assignee">{{user.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <span>Start Date</span>
                        <div class="input-group date" id="datepicker">
                            <input type="date" class="form-control" id="startdate" v-model="issueFormData.startDate" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <span>Due Date</span>
                        <div class="input-group date" id="datepicker">
                            <input type="date" class="form-control" id="duedate" v-model="issueFormData.dueDate" />
                        </div>
                    </div>
                </div>
                <div v-if="isMessage" :class='"text-center alert mt-3 alert-" + type' role="alert">
                    {{ message }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                    <button v-if="isAdded" type="submit" class="btn btn-primary" :disabled="isDisabled" @click="updateIssue">Update</button>
                    <button v-else class="btn btn-primary" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Chờ tí...
                    </button>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import dbRequest from '../../apis/dbRequest';
export default {
    name: "ModalUpdateIssue",
    data() {
        return {
            isAdded: true,
            isMessage: false,
            message: null,
            type: null,
            isDisabled: false,
            optionStatus: ["New", "To Do", "In Progress", "Review", "Done"],
            optionDone: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            issueFormData: {}
        }
    },
    props: ["modal"],
    computed: {
        getUsers() {
            return this.modal.users
        },
        getIssue() {
            return this.issueFormData = this.modal.data
        },
    },
    watch: {
        getIssue() {},
    },
    methods: {
        updateIssue() {
            const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            const localISOTime = new Date(Date.now() - tzoffset).toISOString()
            const statusVal = document.getElementById("status_select").value
            const doneVal = document.getElementById("done_select").value
            const assigneeVal = document.getElementById("assignee_select").value
            const payload = {
                status: statusVal,
                doneProgress: doneVal,
                assignee: assigneeVal,
                startDate: this.issueFormData.startDate,
                dueDate: this.issueFormData.dueDate,
                updatedAt: localISOTime
            }
            console.log(this.issueFormData.id,payload)
            this.isAdded = false
            dbRequest.updateIssue(this.issueFormData.id, payload)
            .then(result => {
                this.issueFormData.status = payload.status
                this.issueFormData.doneProgress = payload.doneProgress
                this.issueFormData.assignee = payload.assignee
                this.issueFormData.startDate = payload.startDate
                this.issueFormData.dueDate = payload.dueDate
                this.isMessage = true
                this.isAdded = true
                this.type = "success"
                this.message = "Thêm issue thành công!"
            })
            .catch(err => {
                this.isAdded = false
                this.isMessage = true
                this.type = "danger"
                this.message = err.response
            })
        }
    },
}
</script>

<style>
.input-group-append {
    cursor: pointer;
}

.help-message {
    display: block;
    color: red;
    margin-top: -15px;
    margin-bottom: 15px;
}
</style>
