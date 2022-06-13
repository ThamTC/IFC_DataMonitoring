<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="realtimeModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title mt_warning" id="modalLabel">Cảnh báo !!!</h5>
            </div>
            <div class="modal-body">
                <div v-if="isCanShow">
                    Lựa chọn 1 trong các option bên dưới để hoàn thành!
                    <div class="p-3">
                        <div class="form-check">
                            <input v-model="selection" class="form-check-input" type="radio" value="1" name="flexRadioDefault" id="flexRadioDefault1" checked :disabled="inputDisable">
                            <label class="form-check-label" for="flexRadioDefault1">
                                1 giờ trước
                            </label>
                        </div>
                        <div class="form-check">
                            <input v-model="selection" class="form-check-input" type="radio" value="3" name="flexRadioDefault" id="flexRadioDefault2" :disabled="inputDisable">
                            <label class="form-check-label" for="flexRadioDefault2">
                                3 giờ trước
                            </label>
                        </div>
                        <div class="form-check">
                            <input v-model="selection" class="form-check-input" type="radio" value="6" name="flexRadioDefault" id="flexRadioDefault3" :disabled="inputDisable">
                            <label class="form-check-label" for="flexRadioDefault3">
                                6 giờ trước
                            </label>
                        </div>
                        <div class="form-check">
                            <input v-model="selection" class="form-check-input" type="radio" value="12" name="flexRadioDefault" id="flexRadioDefault4" :disabled="inputDisable">
                            <label class="form-check-label" for="flexRadioDefault4">
                                12 giờ trước
                            </label>
                        </div>
                        <div class="input-group input-group-sm mb-3 mt-1">
                            <input @keyup="getHour" v-model="inputHour" type="number" class="form-control input-hour" placeholder="2" aria-label="Recipient's username" aria-describedby="basic-addon2" min="0.1" max="99" step="0.1">
                            <span class="px-2">giờ trước</span>
                        </div>
                    </div>
                </div>
                <div v-else>
                    Bạn không có quyền để sử dụng chức năng này. Vui lòng liên hệ quản trị viên.
                </div>
            </div>
            <div class="modal-footer" v-if="isCanShow" >
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="deleteAll">Có</button>
            </div>
            <div class="modal-footer" v-else>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";

export default {
    name: "ModalRealtime",
    data() {
        return {
            selection: "1",
            checkerName: "",
            inputHour: "",
            inputDisable: false,
            hourRemove: 0,
        }
    },
    props: ["modal"],
    computed: {
        ...mapGetters(["getLoginName"]),
        isCanShow() {
            return this.modal.isCan
        }
    },
    mounted() {
        this.checkerName = this.getLoginName
    },
    methods: {
        async deleteAll() {
            if (!this.inputDisable) {
                this.hourRemove = parseInt(this.selection)
            }
            const deleteChannel = this.modal.name
            var updateChannel
            if (this.modal == "realtime") {
                updateChannel = "updateRealtime"
            } else if (this.modal == "bmb_realtime") {
                updateChannel = "updateRealtimeBmb"
            }
            else {
                updateChannel = "updateRealtimeSolar"
            }
            this.$socket.emit("deleteRealtime", {
                deleteChannel: deleteChannel,
                updateChannel: updateChannel,
                username: this.checkerName,
                hour: this.hourRemove
            })
        },
        isNaN(x) {
            x = Number(x);
            return x != x;
        },
        getHour() {
            this.hourRemove = parseInt(this.inputHour)
            if (!isNaN(this.hourRemove) && parseFloat(this.inputHour) > 0) {
                this.inputDisable = true
            } else {
                this.inputDisable = false
            }
        }
    },
}
</script>

<style>
.input-hour {
    max-width: 10%;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
