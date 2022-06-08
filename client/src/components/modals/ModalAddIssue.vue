<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="addIssueModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Adding Issue</h5>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <span>Status</span>
                        <select name="" id="" class="form-select">
                            <option :value="status" v-for="(status, idx) in optionStatus" :key="idx">{{status}}</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <span>% Done</span>
                        <select name="" id="" class="form-select">
                            <option :value="done" v-for="(done, idx) in optionDone" :key="idx">{{done}}%</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <span>Subject</span>
                        <input type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="descriptionArea">Description</label>
                        <textarea class="form-control" id="descriptionArea" rows="3"></textarea>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <span>Added by</span>
                            <select name="" id="" class="form-control">
                                <option value=""></option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <span>Assignee</span>
                            <select name="" id="" class="form-control">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <span>Start Date</span>
                            <div class="input-group date" id="datepicker">
                                <input type="date" class="form-control" id="startdate" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <span>Due Date</span>
                            <div class="input-group date" id="datepicker">
                                <input type="date" class="form-control" id="duedate" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="isMessage" :class='"alert mx-3 alert-" + type' role="alert">
                {{ message }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                <button v-if="isAdded" type="button" class="btn btn-primary" @click="addPermission" :disabled="isDisabled">Thêm</button>
                <button v-else class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Chờ tí...
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "ModalAddIssue",
    data() {
        return {
            isAdded: true,
            isMessage: false,
            message: "",
            isDisabled: true,
            optionStatus: ["Open", "To Do", "In Progress", "Review", "Done"],
            optionDone: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        }
    },
    methods: {
    },
}
</script>

<style>
.input-group-append {
  cursor: pointer;
}
</style>
