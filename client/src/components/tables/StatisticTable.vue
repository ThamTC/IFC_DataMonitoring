<template>
<main>
    <div class="container-fluid p-2">
        <div class="text-center mt-5" v-if="statisticData.isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="card mb-4" v-else>
            <p v-if="statisticData.isError" class="text-center">Đã có lỗi xảy ra: {{statisticData.error}}. Vui lòng liên hệ quản trị viên!</p>
            <div v-else class="card-body">
                <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                    <div class="dataTable-top"></div>
                    <div class="table-wrapper">
                        <table class="table-ifc table-dark table-ifc-hover table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr id="0">
                                    <th>Type</th>
                                    <th>System</th>
                                    <th>Message</th>
                                    <!-- <th>Parameter</th> -->
                                    <!-- <th>Value</th>
                                    <th>Unit</th> -->
                                    <th>Total</th>
                                    <!-- <th>Status</th> -->
                                    <!-- <th>Priority</th> -->
                                    <th>Action</th>
                                    <th>Person</th>
                                    <th @click="doneTaskSelections" id="delete-all" :class="enableDone">Done</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ref="item" :id="dataItem?.priority" v-for="(dataItem, idx) in getDataItems" :key="idx">
                                    <td>{{ dataItem?.type }}</td>
                                    <td>{{ dataItem?.system }}</td>
                                    <td>{{ dataItem?.parameter }}</td>
                                    <!-- <td>{{ dataItem?.message }}</td> -->
                                    <!-- <td>{{ dataItem?.value }}</td>
                                    <td>{{ dataItem?.unit }}</td> -->
                                    <!-- <td>{{ dataItem?.status }}</td> -->
                                    <!-- <td>{{ dataItem?.priority }}</td> -->
                                    <td>{{ dataItem?.total }}</td>
                                    <td>
                                        <input @click="check" name="chkbox" :value="idx" class="form-check-input" type="checkbox" :checked="dataItem.isAction" :disabled="isDisable(dataItem.username)" />
                                    </td>
                                    <!-- <td>{{ dataItem?.contact }}</td> -->
                                    <td :ref="'checkerName_' + idx">{{ dataItem.username }}</td>
                                    <td><i @click="doneOneTask" :id="idx" class="fas fa-trash" style="color:white;"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal-statistic/>
</main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ModalStatistic from '../modals/ModalStatistic.vue'
export default {
    name: "Statistic",
    components: {
        ModalStatistic
    },
    data() {
        return {
            checkerName: "",
        };
    },
    props: {
        statisticData: {
            type: Object,
            default: {
                isError: false,
                error: null,
                isLoading: true,
                routeName: "",
                dataItems: [],
            }
        }
    },
    mounted() {
        this.checkerName = this.getLoginName
    },
    computed: {
        ...mapGetters(["getLoginName", "getDataStatistic", "getSolarStatistic"]),
        getDataItems() {
            return this.statisticData.dataItems
        },
        enableDone() {
            return this.statisticData.dataItems.length ? "" : "disable"
        }
    },
    
    methods: {
        ...mapActions(["selectTask"]),
        check(e) {
            this.selectTask({e: e, checkerName: this.checkerName, key: this.statisticData.routeName})
        },
        async doneOneTask(e) {
            let doneName = this.$refs["checkerName_" + e.target.id][0].innerText || this.checkerName
            this.$socket.emit("doneTask", {checkerName: this.checkerName, doneName: doneName, id: e.target.id, key: this.statisticData.routeName})
        },
        isDisable(name) {
            return this.checkerName !== name && name != ''
        },
        doneTaskSelections() {
            var myModal = new bootstrap.Modal(document.getElementById('statisticModal'))
            myModal.show()
        }
    },
}
</script>

<style>

</style>
