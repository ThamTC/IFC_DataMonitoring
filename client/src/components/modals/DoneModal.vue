<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="doneModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title mt_warning" id="exampleModalLabel">Cảnh báo !!!</h5>
            </div>
            <div class="modal-body">
                Lựa chọn 1 trong các option bên dưới để hoàn thành!
                <div class="p-3">
                    <div class="form-check">
                        <input v-model="selection" class="form-check-input" type="radio" value="checked" name="flexRadioDefault" id="flexRadioDefault1" checked>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Hoàn thành các công việc đã check
                        </label>
                    </div>
                    <div class="form-check">
                        <input v-model="selection" class="form-check-input" type="radio" value="unchecked" name="flexRadioDefault" id="flexRadioDefault2">
                        <label class="form-check-label" for="flexRadioDefault2">
                            Hoàn thành các công việc chưa check
                        </label>
                    </div>
                    <div class="form-check">
                        <input v-model="selection" class="form-check-input" type="radio" value="checkedall" name="flexRadioDefault" id="flexRadioDefault3">
                        <label class="form-check-label" for="flexRadioDefault3">
                            Hoàn thành tất cả
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="deleteAll">Có</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import redisRequest from "../../apis/redisRequest";
import store from "../../stores/store";

export default {
    name: "DoneModal",
    data() {
        return {
            selection: "checked",
            checkerName: ""
        }
    },
    mounted() {
        this.checkerName = store.getters.getLoginName
    },
    methods: {
        async deleteAll() {
            const resData = await redisRequest.doneSelectionTask(this.checkerName, this.selection, "statistic")
            console.log("resData: ", resData)
            store.commit("setDataStatistic", resData);
        },
    },
}
</script>

<style>

</style>
