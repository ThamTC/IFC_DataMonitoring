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
                    <div class="dataTable-top"></div>
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
            modal: null
        }
    },
    methods: {
        addIssue() {
            var myModal = new bootstrap.Modal(document.getElementById('addIssueModal'))
            myModal.show()
        }
    },
}
</script>

<style>

</style>
