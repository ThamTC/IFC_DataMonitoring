<template>
<main>
    <div class="container-fluid px-4">
        <div class="text-center mt-5" v-if="isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="card mb-4" v-else>
            <!-- <div class="card-header">
            <i class="fas fa-table me-1"></i> DataTable Example
        </div> -->

            <div class="card-body">
                <div class="
              dataTable-wrapper dataTable-loading
              no-footer
              sortable
              searchable
              fixed-columns
            ">
                    <div class="dataTable-top"></div>
                    <div class="table-wrapper">
                        <table table class="table table-striped table-dark table-hover table-bordered " id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Hệ thống</th>
                                    <th>Nội dung cảnh báo</th>
                                    <th>Số lượng</th>
                                    <th>Xử lý?</th>
                                    <th>Người thực hiện</th>
                                    <th id="delete-all" data-bs-toggle="modal" data-bs-target="#exampleModal">Xóa</th>
                                </tr>
                            </thead>

                            <tbody id="statistic">
                                <tr v-for="(item, idx) in dataItems" :key="idx">
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.content }}</td>
                                    <td>{{ item.count }}</td>
                                    <td>
                                        <input @click="check" name="chkbox" :value="idx" class="form-check-input" type="checkbox" :checked="item.isAction" :disabled="isDisable(item.username)" />
                                    </td>
                                    <td :ref="'checkerName_' + idx">{{ item.username }}</td>
                                    <td><i @click="doneTask" :id="idx" class="fas fa-trash"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mt_warning" id="exampleModalLabel">Cảnh báo !!!</h5>
                </div>
                <div class="modal-body">
                    Bạn có muốn hoàn thành tất cả các công việc không?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="deleteAll">Có</button>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
import redisRequest from "../../redisRequest";
import store from "../../stores/store";

export default {
    name: "RealTime",

    data() {
        return {
            isLoading: true,
            checkerName: "",
        };
    },
    computed: {
        dataItems() {
            return store.getters.getDataStatistic
        }
    },
    mounted() {
        this.checkerName = store.getters.getLoginName
    },
    created() {
        redisRequest
            .getIndexStore("statistic")
            .then((res) => {
                store.commit("setDataStatistic",res.data);
                this.isLoading = false;
            })
            .catch((err) => {
                alert(err.response.data);
            }),
            document.title = "Thống kê"
    },
    methods: {
        async check(e) {
            const resData = await redisRequest.selectTask(e, this.checkerName)
            store.commit("setDataStatistic",resData);
        },
        async doneTask(e) {
            let doneName = this.$refs["checkerName_" + e.target.id][0].innerText || this.checkerName
            const resData = await redisRequest.doneTask(e.target.id, this.checkerName, doneName)
            store.commit("setDataStatistic",resData);
        },
        isDisable(name) {
            return this.checkerName !== name && name != ''
        },
        async deleteAll() {
            const resData = await redisRequest.doneAllTask(this.checkerName)
            store.commit("setDataStatistic",resData);
        }
    }
};
</script>

<style>
</style>
