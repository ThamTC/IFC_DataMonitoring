<template>
    <main>
        <div class="container-fluid p-2">
            <div>
                <div class="card mb-2">
                    <p v-if="isError" class="text-center">
                        Đã có lỗi xảy ra: {{ error }}.
                    </p>
                    <div class="card-body">
                        <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                            <div class="d-flex mb-3 justify-content-end">
                                <select @change="changeProgress" name="" class="me-3" v-model="progressSelection">
                                    <option :value="item" v-for="(item, idx) in doneProgress" :key="idx">
                                        {{ item }}
                                    </option>
                                </select>
                                <select @change="changeUser" name="" class="me-3" v-if="isCanShow"
                                    v-model="userSelection">
                                    <option value="All">All</option>
                                    <option :value="user.name" v-for="(user, idx) in users" :key="idx">
                                        {{ user.name }}
                                    </option>
                                </select>
                                <span>From:</span>
                                <div class="date" id="fromdatepicker">
                                    <input @change="changeDate" type="date" class="" id="fromdatefilter"
                                        v-model="fromDateSelection" />
                                </div>
                                <span class="ms-1">To:</span>
                                <div class="date" id="todatepicker">
                                    <input @change="changeDate" type="date" class="" id="todatefilter"
                                        v-model="toDateSelection" />
                                </div>
                            </div>
                            <div class="text-center mt-5" v-if="isLoading">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div v-else class="table-wrapper">
                                <table class="table-ifc table-light table-hover" id="dataTable" width="100%"
                                    cellspacing="0">
                                    <thead>
                                        <tr id="0" class="text-center">
                                            <th style="width: 5%">#</th>
                                            <th style="width: 7%">Status</th>
                                            <th style="width: 68%">Subject</th>
                                            <th style="width: 8%">%Done</th>
                                            <th style="width: 12%">Updateded</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, idx) in dataItems" :key="idx" class="text-center">
                                            <td style="width: 5%">
                                                <router-link :to="{
                                                    name: 'issue_detail',
                                                    params: { id: idx + 1 },
                                                }" class="text-decoration-none">{{ item.id }}</router-link>
                                            </td>
                                            <td style="width: 7%">{{ item.status }}</td>
                                            <td style="width: 68%" class="text-start">
                                                <router-link :to="{
                                                    name: 'issue_detail',
                                                    params: { id: idx + 1 },
                                                }" class="text-decoration-none">{{ item.subject }}</router-link>
                                            </td>
                                            <td style="width: 8%">
                                                <div class="progress">
                                                    <div :class="'progress-bar bg-'+bg_colordone(item.dueDate, item.status)" role="progressbar"
                                                        :style="'width: ' + item.doneProgress + '%'" aria-valuenow="25"
                                                        aria-valuemin="0" aria-valuemax="100">
                                                        {{ item.doneProgress }}%
                                                    </div>
                                                </div>
                                            </td>
                                            <td style="width: 12%">
                                                {{ formatDate(item.updatedAt) }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="text-center mt-3">
                                <div class="page-container">
                                    <button @click="firstPage" class="first-page" :disabled="isPrev">
                                        <i class="fas fa-angle-double-left"></i>
                                    </button>
                                    <button @click="prePage" class="prev-page" :disabled="isPrev">
                                        <i class="fas fa-angle-left"></i>
                                    </button>
                                    <div id="pagination">
                                        <li :class="'pg-item ' + item.active" :data-page="item.index"
                                            v-for="(item, idx) in elePaginations" :key="idx" @click="choosePage">
                                            <a class="pg-link" href="#">{{ item.index }}</a>
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
                    <button type="button" class="btn btn-primary" @click="addIssue">
                        Add Task
                    </button>
                </div>
            </div>
        </div>
        <modal-add-issue :modal="modal" />
    </main>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import dbRequest from "../../apis/dbRequest";
import ModalAddIssue from "../modals/ModalAddIssue.vue";
import format from "../../untils/format";
import jwtDecode from "jwt-decode";
import pagination from "./pagination";
export default {
    components: {
        ModalAddIssue,
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
                users: [],
            },
            userSelection: "All",
            fromDateSelection: null,
            toDateSelection: null,
            users: [],
            elePaginations: [],
            isPrev: true,
            isNext: false,
            curPage: 1,
            totalPage: 10,
            oldPage: 1,
            doneProgress: ["All", "New", "To Do", "In Progress", "Review", "Done"],
            progressSelection: "All",
        };
    },
    computed: {
        ...mapGetters(["getIssues", "getManagerUsers", "getUser"]),
        dataItems() {
            return this.getIssues;
        },
        isCanShow() {
            const user = this.getUser;
            if (user.role === "manager") {
                return true;
            }
            return false;
        },
    },
    created() {
        const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = new Date(Date.now() - tzoffset).toISOString();
        this.fromDateSelection = localISOTime.slice(0, 10);
        this.toDateSelection = localISOTime.slice(0, 10);
        this.isLoading = true;
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            this.user = jwtDecode(accessToken);
        } else {
            this.user = this.getUser;
        }
        this.userSelection =
            this.user.role === "manager" ? "All" : this.user.username;
        const options = {
            where: {
                assignee: this.userSelection,
                startDate: localISOTime.slice(0, 10) + "T00:00:00",
                endDate: localISOTime,
            },
            offset: 1,
            limit: 10,
        };
        dbRequest
            .getAllUsers()
            .then((data) => {
                this.setManagerUsers(data.data);
                this.users = data.data.map((ele) => {
                    return {
                        id: ele.id,
                        name: ele.username,
                    };
                });
                return this.getCounterIssue(options.where);
            })
            .then((result) => {
                // set total page
                const len = result.data;
                const f_total = Math.floor(len / 10);
                this.totalPage = len % 10 > 0 ? f_total + 1 : 0;
                this.elePaginations = pagination.pagination(
                    this.totalPage,
                    this.curPage
                );
                this.handleButtonLeft();
                this.handleButtonRight();
                // get all issue per one page
                return this.getAllIssue(options);
            })
            .then((result) => {
                this.setIssues(result.data);
                this.isLoading = false;
            })
            .catch((error) => {
                this.isLoading = false;
                this.isError = true;
                this.error = error;
            });
    },
    methods: {
        ...mapMutations(["setIssues", "setManagerUsers"]),
        ...mapActions(["getAllIssue", "getCounterIssue"]),
        bg_colordone(dueDate=Date.now(), status='Done') {
            const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
            const localISOTime = new Date(Date.now() - tzoffset).toISOString();
            if (status !== 'Done' && dueDate < localISOTime) { 
                return "danger"
            }
            return 'success'
        },
        addIssue() {
            var myModal = new bootstrap.Modal(
                document.getElementById("addIssueModal")
            );
            this.modal.name = "";
            this.modal.authName = this.getUser.username;
            this.modal.users = this.users;
            localStorage.setItem("issueDetail", JSON.stringify(this.modal));
            myModal.show();
        },
        formatDate(date) {
            return format.formatDate(date);
        },
        firstPage() {
            this.isNext = false;
            this.isPrev = true;
            this.curPage = 1;
            this.requestIssue(this.curPage);
        },
        prePage() {
            this.isNext = false;
            this.curPage--;
            this.handleButtonLeft();
            this.requestIssue(this.curPage);
        },
        nextPage() {
            this.isPrev = false;
            this.curPage++;
            this.handleButtonRight();
            this.requestIssue(this.curPage);
        },
        lastPage() {
            this.isNext = true;
            this.isPrev = false;
            this.curPage = this.totalPage;
            this.requestIssue(this.curPage);
        },
        handleButtonLeft() {
            if (this.curPage <= 1) {
                this.curPage = 1;
                this.isPrev = true;
                this.isPrev = true;
            } else {
                this.isPrev = false;
                this.isPrev = false;
            }
        },
        handleButtonRight() {
            if (this.curPage >= this.totalPage) {
                this.curPage = this.totalPage;
                this.isNext = true;
                this.isNext = true;
            } else {
                this.isNext = false;
                this.isNext = false;
            }
        },
        choosePage(e) {
            const ele = e.target;
            if (ele.dataset.page) {
                const pageNumber = parseInt(e.target.dataset.page, 10);
                if (!isNaN(pageNumber)) {
                    if (pageNumber != this.oldPage) {
                        this.oldPage = pageNumber;
                        this.curPage = pageNumber;
                        this.handleButtonLeft();
                        this.handleButtonRight();
                        this.requestIssue(pageNumber);
                    }
                }
            }
        },
        changeUser() {
            this.requestIssue();
        },
        changeDate() {
            this.requestIssue();
        },
        requestIssue(offset = 1, limit = 10) {
            this.isError = false;
            const userSelected = this.userSelection;
            const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
            const localISOTime = new Date(Date.now() - tzoffset).toISOString();
            if (this.fromDateSelection <= this.toDateSelection) {
                const options = {
                    where: {
                        assignee: userSelected,
                        startDate: this.fromDateSelection + "T00:00:00",
                        endDate: this.toDateSelection + localISOTime.slice(10),
                    },
                    offset: offset,
                    limit: limit,
                };
                this.isLoading = true;
                this.getCounterIssue(options.where)
                    .then((result) => {
                        // set total page
                        const len = result.data;
                        const f_total = Math.floor(len / 10);
                        this.totalPage = len % 10 > 0 ? f_total + 1 : 0;
                        this.curPage = offset;
                        this.handleButtonRight();
                        this.elePaginations = pagination.pagination(
                            this.totalPage,
                            this.curPage
                        );
                        // get all issue per one page
                        return this.getAllIssue(options);
                    })
                    .then((result) => {
                        this.isLoading = false;
                        this.setIssues(result.data);
                    })
                    .catch((error) => {
                        this.isLoading = false;
                        this.isError = true;
                        this.error = error;
                    });
            } else {
                this.isError = true;
                this.error = "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc";
            }
        },
    },
};
</script>

<style>
</style>
