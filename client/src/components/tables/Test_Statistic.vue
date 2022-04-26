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
                    <div class="table-wrapper">
                        <table class="table-test table-dark table-test-hover table-bordered" id="dataTable" width="100%" cellspacing="0">
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
    <DoneModal></DoneModal>
</main>
</template>

<script>
import redisRequest from '../../redisRequest'
import store from '../../stores/store'
import DoneModal from '../../components/modals/DoneModal.vue'
export default {
    name: "Test_Statistic",
    components: {
        DoneModal
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
            return store.getters.getDataTestStatistic
        },
        enableDone() {
            return store.getters.getDataTestStatistic.length ? "" : "disable"
        }
    },
    created() {
        redisRequest.getIndexStore("test_statistic").then((data) => {
                store.commit("setDataTestStatistic", data)
                this.isLoading = false
            }).catch((err) => {
                console.log(err)
            }),
            document.title = "Test Statistic"
    },
    methods: {
        check(e) {
            console.log(e.target.checked)
            redisRequest.selectTask(e, this.checkerName, "test_statistic")
                .then((data) => {
                    store.commit("setDataTestStatistic", data);
                })
                .catch((err) => console.log(err))
        },
        async doneTask(e) {
            console.log(e.target.id)
            let doneName = this.$refs["checkerName_" + e.target.id][0].innerText || this.checkerName
            const resData = await redisRequest.doneTask(e.target.id, this.checkerName, doneName, "test_statistic")
            store.commit("setDataTestStatistic", resData);
        },
        isDisable(name) {
            return this.checkerName !== name && name != ''
        },
        done() {
            var myModal = new bootstrap.Modal(document.getElementById('doneModal'))
            if(store.getters.getDataTestStatistic.length > 0) {
                myModal.show()
            }
        }
    },
}
</script>

<style>

</style>
