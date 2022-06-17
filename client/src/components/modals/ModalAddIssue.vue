<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="addIssueModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Adding Issue</h5>
            </div>
            <div class="modal-body">
                <Form action="" @submit="addIssue" method="post" :validation-schema="schema">
                    <div class="row">
                        <div class="col-md-6">
                            <span>Status</span>
                            <select name="" id="status_select" class="form-select">
                                <option :value="status" v-for="(status, idx) in optionStatus" :key="idx" :selected="idx==0">{{status}}</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <span>% Done</span>
                            <select name="" id="done_select" class="form-select">
                                <option :value="done" v-for="(done, idx) in optionDone" :key="idx" :selected="idx==0">{{done}}%</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <span>Subject</span>
                        <Field name="subject" type="text" class="form-control" v-model="issueFormData.subject" />
                    </div>
                    <ErrorMessage name="subject" class="help-message mt-2" />
                    <div class="form-group">
                        <label for="descriptionArea">Description</label>
                        <Field class="form-control" id="descriptionArea" rows="3" v-model="issueFormData.description" name="description" />
                    </div>
                    <ErrorMessage name="description" class="help-message mt-2" />
                    <div class="row">
                        <div class="col-md-6">
                            <span>Added by</span>
                            <input type="text" class="form-control" v-model="issueFormData.addedBy" disabled />
                        </div>
                        <div class="col-md-6">
                            <span>Assignee</span>
                            <select name="" id="assignee_select" class="form-control">
                                <option :value="user.name" v-for="(user, idx) in getUsers" :key="idx" :selected="user.name==getAuthName">{{user.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
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
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                        <button v-if="isAdded" type="submit" class="btn btn-primary" :disabled="isDisabled">Thêm</button>
                        <button v-else class="btn btn-primary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Chờ tí...
                        </button>
                    </div>
                </Form>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import {
    Form, Field,
    ErrorMessage
} from 'vee-validate'
import * as yup from 'yup';
import { mapActions, mapMutations } from 'vuex';
import dbRequest from '../../apis/dbRequest';
export default {
    name: "ModalAddIssue",
    components: {
        Form, Field,
        ErrorMessage
    },
    data() {
        const schema = yup.object({
            subject: yup.string().required("Không được để trống!").nullable().min(6, "Nhập tối thiếu 6 ký tự"),
            description: yup.string().required("Không được để trống!").nullable().min(6, "Nhập tối thiếu 6 ký tự")
        })
        return {
            schema,
            isAdded: true,
            isMessage: false,
            message: null,
            type: null,
            isDisabled: false,
            optionStatus: ["New", "To Do", "In Progress", "Review", "Done"],
            optionDone: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            issueFormData: {
                subject: null,
                description: null,
                addedBy: null,
                startDate: null,
                dueDate: null
            }
        }
    },
    props: ["modal"],
    computed: {
        getUsers() {
            return this.modal.users
        },
        getAuthName() {
            return this.issueFormData.addedBy = this.modal.authName
        }
    },
    watch: {
        getAuthName() {}
    },
    created() {
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = new Date(Date.now() - tzoffset).toISOString()
        const dateNow = localISOTime.slice(0, 10)
        this.issueFormData.startDate = dateNow
        this.issueFormData.dueDate = dateNow
    },
    methods: {
        ...mapMutations(["insertIssue"]),
        addIssue() {
            const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            const localISOTime = new Date(Date.now() - tzoffset).toISOString()
            const statusVal = document.getElementById("status_select").value
            const doneVal = document.getElementById("done_select").value
            const assigneeVal = document.getElementById("assignee_select").value
            const payload = {
                projectId: 0,
                status: statusVal,
                subject: this.issueFormData.subject,
                description: this.issueFormData.description,
                priority: 0,
                doneProgress: doneVal,
                addedBy: this.issueFormData.addedBy,
                assignee: assigneeVal,
                startDate: this.issueFormData.startDate + localISOTime.slice(10),
                dueDate: this.issueFormData.dueDate + 'T23:59:00',
                updatedAt: localISOTime
            }
            this.isAdded = false
            dbRequest.createIssue(payload)
            .then(result => {
                this.insertIssue(result.data)
                this.isMessage = true
                this.isAdded = true
                this.type = "success"
                this.message = "Thêm issue thành công!"
            })
            .catch(err => {
                this.isAdded = true
                this.isMessage = true
                this.type = "danger"
                this.message = err.response.data
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
