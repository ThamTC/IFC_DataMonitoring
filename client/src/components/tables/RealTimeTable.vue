<template>
<main>
    <div class="container-fluid px-4">
        <div class="text-center mt-5" v-if="isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="card mb-4" v-else>
            <div class="card-body">
                <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                    <div class="dataTable-top"></div>
                    <!-- <div class="align-items-end">
                        <button type="button" class="btn btn-primary mb-1" id="add-column" data-bs-toggle="modal" data-bs-target="#addColumnModal">Thêm cột</button>
                    </div> -->
                    <div class="d-flex">
                        <button type="button" :class="'btn btn-' + countColor[0]+' mbr-2'" v-for="(countColor, idx) in countColors" :key="idx">{{countColor[1]}}</button>
                        <button type="button" :class="'btn btn-' + currentData.color+' mbr-2 mx-5 flex-grow-1'" disabled>{{currentData.msg}}</button>
                        <button v-if="dataItems.length > 0" @click="removeTask" type="button" class="btn btn-primary mbr-2">Remove Data</button>
                    </div>
                    <div class="table-wrapper">
                        <table class="table-ifc table-dark table-ifc-hover table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr id="0">
                                    <th>Type</th>
                                    <th>System</th>
                                    <th>Parameter</th>
                                    <th>Value</th>
                                    <th>Unit</th>
                                    <th>Time</th>
                                    <!-- <th>Status</th> -->
                                    <!-- <th>Priority</th> -->
                                    <th>Message</th>
                                    <th>Action</th>
                                    <th>Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ref="item" :id="dataItem?.priority" v-for="(dataItem, idx) in dataItems" :key="idx">
                                    <td>{{ dataItem?.type }}</td>
                                    <td>{{ dataItem?.system }}</td>
                                    <td>{{ dataItem?.parameter }}</td>
                                    <td>{{ dataItem?.value }}</td>
                                    <td>{{ dataItem?.unit }}</td>
                                    <td>{{ dataItem?.time }}</td>
                                    <!-- <td>{{ dataItem?.status }}</td> -->
                                    <!-- <td>{{ dataItem?.priority }}</td> -->
                                    <td>{{ collapMessage(dataItem?.message) }}</td>
                                    <td>{{ dataItem?.action }}</td>
                                    <td>{{ collapContact(dataItem?.contact) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div ref="modal" class="modal fade" id="addColumnModal" tabindex="-1" aria-labelledby="addColumnModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addColumnModalLabel">Thay đổi cột hiển thị</h5>
                </div>
                <div class="d-inline-flex">
                    <div class="modal-body">
                        <table class="table table-striped table-dark table-hover table-bordered" width="100%" cellspacing="0">
                            <thead>
                                <tr ref="title">
                                    <th v-for="(title, idx) in titles" :key="idx">{{title}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ref="nameShow">
                                    <td v-for="(inputShow, idx) in inputShows" :key="idx">
                                        <input @keyup="inputShowTable" name="name-show" class="form-control" :id="idx" type="text" placeholder="Hệ thống" ref="show" />
                                    </td>
                                </tr>
                                <tr ref="nameQuery">
                                    <td v-for="(inputQuery, idx) in inputQuerys" :key="idx">
                                        <input @keyup="inputQueryTable" name="name-query" class="form-control" :id="idx" type="text" placeholder="name" ref="query" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex-sm-column d-flex">
                        <i @click="addColumn" class="fas fa-plus-square icon-add-column" ref="iconPlus"></i>
                        <i @click="removeColumn" class="fas fa-minus-square icon-remove-column" ref="iconMinus"></i>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addColumn">Thay đổi</button>
                </div>
            </div>
        </div>
    </div>
    <DoneModal :content="title"></DoneModal>
</main>
</template>

<script>
import redisRequest from '../../apis/redisRequest'
import store from '../../stores/store'
import storeController from '../../controllers/storeController'
import DoneModal from '../modals/DoneModal.vue'

export default {
    name: "Realtime",
    components: {
        DoneModal
    },
    data() {
        return {
            isLoading: true,
            shows: [0],
            querys: [0],
            inputShows: ["Hệ thống"],
            inputQuerys: ["name"],
            titles: ["Hệ thống"],
            title: "realtime"
        }
    },
    computed: {
        dataItems() {
            return store.getters.getDataRealtime
        },
        countColors() {
            return store.getters.getCountColors
        },
        currentData() {
            return store.getters.getCurrentData
        }
    },
    created() {
        redisRequest.getIndexStore("realtime").then((data) => {
                storeController.redisRealtimeStore(data)
                storeController.counterColorStore()
                this.isLoading = false
            }).catch((err) => {
                console.log(err)
            }),
            document.title = "Realtime"
    },
    mounted() {
        if (this.inputShows.length == 1) {
            this.$refs.iconMinus.style.cursor = "not-allowed"
        }

    },
    methods: {
        convertColorName() {

        },
        inputShowTable() {
            this.$refs.show.forEach(ele => {
                console.log(ele.id)
            });
        },
        inputQueryTable() {
            console.log("query")
        },
        addColumn() {
            if (this.inputShows.length < 10) {
                this.inputShows.push("Hệ thống")
                this.inputQuerys.push("Hệ thống")
                this.titles.push("Hệ thống")
                this.$refs.iconMinus.style.cursor = "pointer"
                if (this.inputShows.length == 10) {
                    this.$refs.iconPlus.style.cursor = "not-allowed"
                }
            } else {
                this.$refs.iconPlus.style.cursor = "not-allowed"
            }
        },
        removeColumn() {
            if (this.inputShows.length > 1) {
                this.inputShows.pop("Hệ thống")
                this.inputQuerys.pop("Hệ thống")
                this.titles.pop("Hệ thống")
                this.$refs.iconPlus.style.cursor = "pointer"
                if (this.inputShows.length == 1) {
                    this.$refs.iconMinus.style.cursor = "not-allowed"
                }
            } else {
                this.$refs.iconMinus.style.cursor = "not-allowed"
            }
        },
        collapContact(contacts) {
            const phoneNums = contacts.split(',')
            if (phoneNums.length > 1) {
                return phoneNums[0] + ",..."
            }
            return phoneNums[0]
        },
        collapMessage(message) {
            const messages = message.split(' ')
            if (messages.length > 10) {
                return message.slice(0, 10) + ",..."
            }
            return message
        },
        removeTask() {
            var myModal = new bootstrap.Modal(document.getElementById('doneModal'))
            if(store.getters.getDataRealtime.length > 0) {
                myModal.show()
            }
        }
    },
}
</script>

<style>
.icon-add-column {
    font-size: 2rem;
    margin-left: -0.5rem;
    margin-top: 0.9rem;
    margin-right: 1rem;
}

.icon-add-column:hover {
    cursor: pointer;
    color: rgb(77, 77, 77);
}

.icon-remove-column {
    font-size: 2rem;
    margin-left: -0.5rem;
    margin-top: 0.9rem;
    margin-right: 1rem;
}

.icon-remove-column:hover {
    cursor: pointer;
    color: rgb(77, 77, 77);
}
</style>
