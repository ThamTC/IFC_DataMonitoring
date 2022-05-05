<template>
<main>
    <div class="container-fluid p-2">
        <div class="text-center mt-5" v-if="isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="card mb-4" v-else>
            <div class="card-body">
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
                                    <th @click="done" id="delete-all" :class="enableDone">Done</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ref="item" :id="dataItem?.priority" v-for="(dataItem, idx) in dataItems" :key="idx">
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
                                    <td><i @click="doneTask" :id="idx" class="fas fa-trash" style="color:white;"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ModalStatistic></ModalStatistic>
</main>
</template>

<script>
import redisRequest from '../../apis/redisRequest'
import store from '../../stores/store'
import ModalStatistic from '../modals/ModalStatistic.vue'
export default {
    name: "Statistic",
    components: {
        ModalStatistic
    },
    data() {
        return {
            isLoading: true,
            checkerName: "",
        };
    },
    mounted() {
        this.checkerName = store.getters.getLoginName
    },
    computed: {
        dataItems() {
            return store.getters.getDataStatistic
        },
        enableDone() {
            return store.getters.getDataStatistic.length ? "" : "disable"
        }
    },
    created() {
        redisRequest.getIndexStore("statistic").then((data) => {
                store.commit("setDataStatistic", data)
                this.isLoading = false
            }).catch((err) => {
                console.log(err)
            }),
            document.title = "Thống kê"
    },
    methods: {
        check(e) {
            console.log(e.target.checked)
            redisRequest.selectTask(e, this.checkerName, "statistic")
                .then((data) => {
                    store.commit("setDataStatistic", data);
                })
                .catch((err) => console.log(err))
        },
        async doneTask(e) {
            console.log(e.target.id)
            let doneName = this.$refs["checkerName_" + e.target.id][0].innerText || this.checkerName
            this.$socket.emit("doneTask", {checkerName: this.checkerName, doneName: doneName, id: e.target.id, key: "statistic"})
            // const resData = await redisRequest.doneTask(e.target.id, this.checkerName, doneName, "statistic")
            // store.commit("setDataStatistic", resData);
        },
        isDisable(name) {
            return this.checkerName !== name && name != ''
        },
        done() {
            var myModal = new bootstrap.Modal(document.getElementById('modal'))
            if(store.getters.getDataStatistic.length > 0) {
                myModal.show()
            }
        }
    },
}
</script>

<style>

</style>
