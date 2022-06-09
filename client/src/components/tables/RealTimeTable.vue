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
                    <!-- <div class="align-items-end">
                        <button type="button" class="btn btn-primary mb-1" id="add-column" data-bs-toggle="modal" data-bs-target="#addColumnModal">Thêm cột</button>
                    </div> -->
                    <div v-if="dataItems.length > 0" class="d-flex">
                        <button type="button" :class="'btn btn-' + countColor[0]+' me-2 mb-2'" v-for="(countColor, idx) in countColors" :key="idx" :id="countColor[0]" @click="filterPriority">{{countColor[1]}}</button>
                        <button type="button" :class="'btn btn-' + currentData.color+' me-2 mb-2 mx-5 flex-grow-1'" disabled>{{currentData.msg}}</button>
                        <button @click="removeTask" type="button" class="btn btn-primary mb-2">Remove Data</button>
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
    
    <ModalRealtime :modal="modal"></ModalRealtime>
</main>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'
import ModalRealtime from '../modals/ModalRealtime.vue'
import convert from '../../untils/convert'

export default {
    name: "Realtime",
    components: {
        ModalRealtime
    },
    data() {
        return {
            isLoading: true,
            isFilter: false,
            dataFilter: [],
            preFilter: "",
            routeName: "",
            modal: "",
            isError: false,
            error: null
        }
    },
    computed: {
        ...mapGetters([
            "getDataRealtimeFilter", "getDataRealtime", "getCountColors", "getCurrentData",
            "getSolarRealtimeFilter", "getSolarRealtime", "getCurrentSolar", "getCountColorSolars",
            "getBmbRealtimeFilter", "getBmbRealtime", "getCountColorBmbs", "getCurrentBmb"
        ]),
        countColors() {
            if (this.routeName == "solar_realtime") {
                return this.getCountColorSolars
            } else if (this.routeName == "bmb_realtime") {
                return this.getCountColorBmbs
            }
            return this.getCountColors
        },
        dataItems() {
            if (this.isFilter) {
                if (this.routeName == "solar_realtime") {
                    return this.getSolarRealtimeFilter
                } else if (this.routeName == "bmb_realtime") {
                    return this.getBmbRealtimeFilter
                }
                return this.getDataRealtimeFilter
            }
            if (this.routeName == "solar_realtime") {
                return this.getSolarRealtime
            } else if (this.routeName == "bmb_realtime") {
                return this.getBmbRealtime
            }
            return this.getDataRealtime
        },
        currentData() {
            if (this.routeName == "solar_realtime") {
                return this.getCurrentSolar
            } else if (this.routeName == "bmb_realtime") {
                return this.getCurrentBmb
            }
            return this.getCurrentData
        }
    },
    created() {
        document.title = "Realtime"
        this.routeName = this.$route.name
        this.getRealtimeStore(this.routeName)
        .then((data) => {
            if (data == "") {
                data = []
            }
            this.setDataRealtime({
                key: this.routeName,
                data: data
            })
            this.counterColorStore(this.routeName)
            this.isLoading = false
        })
        .catch((err) => {
            this.isLoading = false
            this.isError = true
            this.error = err.message
        })
    },
    methods: {
        ...mapMutations(["setDataRealtimeFilter", "setDataRealtime"]),
        ...mapActions(["getRealtimeStore", "counterColorStore"]),
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
            var myModal = new bootstrap.Modal(document.getElementById('realtimeModal'))
            this.modal = this.routeName
            if (this.routeName == "realtime") {
                if (this.getDataRealtime.length > 0) {
                    myModal.show()
                }
            } else if (this.routeName == "bmb_realtime") {
                if (this.getBmbRealtime.length > 0) {
                    myModal.show()
                }
            } 
            else {
                if (this.getSolarRealtime.length > 0) {
                    myModal.show()
                }
            }

        },
        filterPriority(e) {
            if (this.preFilter !== e.target.id) {
                this.preFilter = e.target.id
                this.isFilter = true
                const priority = convert.colorToId(e.target.id)
                var resData
                if (this.routeName == "realtime") {
                    resData = this.getDataRealtime
                } else if (this.routeName == "solar_realtime") {
                    resData = this.getSolarRealtime
                } else if (this.routeName == "bmb_realtime") {
                    resData = this.getBmbRealtime
                }
                this.dataFilter = resData.filter(ele => ele.priority == priority)
                this.setDataRealtimeFilter({
                    key: this.routeName,
                    data: this.dataFilter
                })
            } else {
                this.isFilter = false
                this.preFilter = ""
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
