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
                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                        <div v-if="dataItems.length" class="d-flex mb-3 justify-content-end">
                            <select name="" id="assignee_select" class="me-3" v-if="isCanShow">
                                <option value="All">All</option>
                                <option :value="user.name" v-for="(user, idx) in users" :key="idx">{{user.name}}</option>
                            </select>
                            <span>From:</span>
                            <div class="date" id="fromdatepicker">
                                <input type="date" class="" id="fromdatefilter" v-model="fromDateSelection" />
                            </div>
                            <span class="ms-1">To:</span>
                            <div class="date" id="todatepicker">
                                <input type="date" class="" id="todatefilter" v-model="toDateSelection" />
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, idx) in dataItems" :key="idx" class="text-center">
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
                        <div v-if="dataItems.length" class="text-center mt-3">
                            <div class="page-container">
                                <button @click="firstPage" class="first-page" :disabled="isPrev">
                                    <i class="fas fa-angle-double-left"></i>
                                </button>
                                <button @click="prePage" class="prev-page" :disabled="isPrev">
                                    <i class="fas fa-angle-left"></i>
                                </button>
                                <div id="pagination">
                                    <li :class='"pg-item " + item.active' :data-page="item.index" v-for="(item, idx) in elePaginations" :key="idx" @click="choosePage">
                                        <a class="pg-link" href="#">{{item.index}}</a>
                                    </li>
                                </div>
                                <button @click="nextPage" class="next-page" :disabled="isNext">
                                    <i class="fas fa-angle-right"></i>
                                </button>
                                <button @click="lastPage" class="last-page" :disabled="isNext">
                                    <i class="fas fa-angle-double-right"></i>
                                </button>
                            </div>
                        </div>

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
import jwtDecode from 'jwt-decode'
import pagination from './pagination'
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
            fromDateSelection: null,
            toDateSelection: null,
            users: [],
            elePaginations: [],
            isPrev: false,
            isNext: false,
            curPage: 1,
            totalPage: 10
        }
    },
    computed: {
        ...mapGetters(["getIssues", "getManagerUsers", "getUser"]),
        dataItems() {
            return this.getIssues
        },
        isCanShow() {
            const user = this.getUser
            if (user.role === 'manager') {
                return true
            }
            return false
        }
    },
    created() {
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = new Date(Date.now() - tzoffset).toISOString()
        this.fromDateSelection = localISOTime.slice(0, 10)
        this.toDateSelection = localISOTime.slice(0, 10)
        this.isLoading = true
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            this.user = jwtDecode(accessToken)
        } else {
            this.user = this.getUser
        }
        this.getAllIssue({
                role: this.user.role,
                authName: this.user.username
            })
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
        this.elePaginations = pagination.pagination(this.totalPage, this.curPage)
    },
    mounted() {
        this.users = this.getManagerUsers.map(ele => {
            return {
                id: ele.id,
                name: ele.username
            }
        })
    },
    methods: {
        ...mapMutations(["setIssues", "setManagerUsers"]),
        ...mapActions(["getAllIssue"]),
        addIssue() {
            var myModal = new bootstrap.Modal(document.getElementById('addIssueModal'))
            this.modal.name = ""
            this.modal.authName = this.getUser.username
            this.modal.users = this.users
            localStorage.setItem("issueDetail", JSON.stringify(this.modal))
            myModal.show()
        },
        formatDate(date) {
            return format.formatDate(date)
        },
        firstPage() {
            this.isNext = false;
            this.isPrev = true
            this.curPage = 1
            this.elePaginations = pagination.pagination(this.totalPage, this.curPage)
        },
        prePage() {
            this.isNext = false;
            this.curPage--
            this.handleButtonLeft()
            this.elePaginations = pagination.pagination(this.totalPage, this.curPage)
        },
        nextPage() {
            this.isPrev = false;
            this.curPage++
            this.handleButtonRight()
            this.elePaginations = pagination.pagination(this.totalPage, this.curPage)
        },
        lastPage() {
            this.isNext = true
            this.isPrev = false;
            this.curPage = this.totalPage
            this.elePaginations = pagination.pagination(this.totalPage, this.curPage)
        },
        handleButtonLeft() {
            if (this.curPage <= 1) {
                this.curPage = 1
                this.isPrev = true;
                this.isPrev = true;
            } else {
                this.isPrev = false;
                this.isPrev = false;
            }
        },
        handleButtonRight() {
            if (this.curPage >= this.totalPage) {
                this.curPage = this.totalPage
                this.isNext = true;
                this.isNext = true;
            } else {
                this.isNext = false;
                this.isNext = false;
            }
        },
        choosePage(e) {
            const ele = e.target
            if (ele.dataset.page) {
                const pageNumber = parseInt(e.target.dataset.page, 10)
                if (!isNaN(pageNumber)) {
                    this.curPage = pageNumber
                    this.handleButtonLeft()
                    this.handleButtonRight()
                    this.elePaginations = pagination.pagination(this.totalPage, pageNumber)
                }
            }
        }
    },
}
</script>

<style>

</style>
