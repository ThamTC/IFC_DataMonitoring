<template>
<main>
    <div class="container-fluid p-2">
        <div class="text-center mt-5" v-if="isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
          <div class="card mb-4" >
              <p v-if="isError" class="text-center">Đã có lỗi xảy ra: {{error}}. Vui lòng liên hệ quản trị viên!</p>
              <div v-else class="card-body">
                  <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                      <div v-if="dataItems.length" class="row mb-3">
                          <div class="input-group date justify-content-end" id="datepicker">
                              <input type="date" class="col-md-1" id="startdate" v-model="dateSelection" />
                          </div>
                      </div>
                      <div class="table-wrapper">
                          <table class="table-ifc table-light table-hover" id="dataTable" width="100%" cellspacing="0">
                              <thead>
                                  <tr id="0" class="text-center">
                                      <th style="width:5%">#</th>
                                      <th style="width:7%">Status</th>
                                      <th style="width:68%">Subject</th>
                                      <th style="width:8%">%Done</th>
                                      <th style="width:12%">Updateded</th>
                                      <!-- <th>Start Date</th>
                                      <th>Due Date</th>
                                      <th>UpdatedDate</th>
                                      <th>Added by</th>
                                      <th>Assignee</th> -->
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="(item, idx) in dataItems" :key="idx" class="text-center">
                                      <!-- <td style="width:5%">{{idx+1}}</td> -->
                                      <td style="width:5%">
                                          <router-link :to="{name: 'issue_detail', params: {id: idx+1}}" class="text-decoration-none">{{idx+1}}</router-link>
                                      </td>
                                      <td style="width:7%">{{item.status}}</td>
                                      <td style="width:68%" class="text-start">
                                          <router-link :to="{name: 'issue_detail', params: {id: idx+1}}" class="text-decoration-none">{{item.subject}}</router-link>
                                      </td>
                                      <td style="width:8%">
                                        <div class="progress">
                                              <div class="progress-bar bg-success" role="progressbar" :style="'width: '+item.doneProgress+'%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{item.doneProgress}}%</div>
                                          </div>
                                      </td>
                                      <td style="width:12%">{{formatDate(item.updatedAt)}}</td>
                                  </tr>
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
    </div>
    <modal-add-issue :modal="modal" />
</main>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'
import dbRequest from '../../apis/dbRequest'
import ModalAddIssue from '../modals/ModalAddIssue.vue'
import format from '../../untils/format'
export default {
    components: {
        ModalAddIssue
    },
    name: "Issue",
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
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = new Date(Date.now() - tzoffset).toISOString()
        this.dateSelection = localISOTime.slice(0, 10)
        this.isLoading = true
        this.getAllIssue({role: this.getUser.role, authName: this.getUser.username})
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
            this.modal.users = this.getManagerUsers.map(ele => {
                return {
                    id: ele.id,
                    name: ele.username
                }
            })
            localStorage.setItem("issueDetail", JSON.stringify(this.modal))
            myModal.show()
        },
        formatDate(date) {
          return format.formatDate(date)
        }
    },
}
</script>

<style>

</style>
