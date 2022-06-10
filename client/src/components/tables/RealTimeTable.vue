<template>
<main>
    <div class="container-fluid p-2">
        <div class="text-center mt-5" v-if="realtimeData.isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="card mb-4" v-else>
            <p v-if="realtimeData.isError" class="text-center">Đã có lỗi xảy ra: {{realtimeData.error}}. Vui lòng liên hệ quản trị viên!</p>
            <div v-else class="card-body">
                <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                    <div class="dataTable-top"></div>
                    <!-- <div class="align-items-end">
                        <button type="button" class="btn btn-primary mb-1" id="add-column" data-bs-toggle="modal" data-bs-target="#addColumnModal">Thêm cột</button>
                    </div> -->
                    <div v-if="getDataItems.length > 0" class="d-flex">
                        <button type="button" :class="'btn btn-' + countColor[0]+' me-2 mb-2'" v-for="(countColor, idx) in realtimeData.countColors" :key="idx" :id="countColor[0]" @click="filterPriority">{{countColor[1]}}</button>
                        <button type="button" :class="'btn btn-' + getCurrentData.color+' me-2 mb-2 mx-5 flex-grow-1'" disabled>{{getCurrentData.msg}}</button>
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
                                <tr ref="item" :id="dataItem?.priority" v-for="(dataItem, idx) in getDataItems" :key="idx">
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
import ModalRealtime from '../modals/ModalRealtime.vue'
import convert from '../../untils/convert'

export default {
    name: "Realtime",
    components: {
        ModalRealtime
    },
    data() {
        return {
            isFilter: false,
            dataFilter: [],
            preFilter: "",
            modal: null
        }
    },
    props: {
        realtimeData: {
            type: Object,
            default: {
                isError: false,
                error: null,
                isLoading: true,
                routeName: "",
                countColors: [],
                dataItems: [],
                currentData: {}
            }
        }
    },
    computed: {
        getDataItems() {
            if (this.isFilter) {
                return this.dataFilter
            }
            return this.realtimeData.dataItems
        },
        getCurrentData() {
            return this.realtimeData.currentData
        }
    },
    
    methods: {
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
            this.modal = this.realtimeData.routeName
            myModal.show()
        },
        filterPriority(e) {
            if (this.preFilter !== e.target.id) {
                this.preFilter = e.target.id
                this.isFilter = true
                const priority = convert.colorToId(e.target.id)
                const resData = this.realtimeData.dataItems
                this.dataFilter = resData.filter(ele => ele.priority == priority)
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
