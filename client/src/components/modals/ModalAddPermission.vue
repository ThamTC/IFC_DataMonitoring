<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="addPermissionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Adding Permission Name</h5>
            </div>
            <div class="modal-body">
                <!-- <span>Input Permission</span> -->
                <div class="form-floating mb-3">
                    <input @input="clearAlert" name="permission" class="form-control" id="inputPermissionModal" type="text" v-model="permissionName" />
                    <label for="inputPermissionnameModal">Input Permission</label>
                </div>
            </div>

            <div v-if="isMessage" :class='"alert mx-3 alert-" + type' role="alert">
                {{ message }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                <button v-if="isUpdated" type="button" class="btn btn-primary" @click="addPermission" :disabled="isDisabled">Thêm</button>
                <button v-else class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Chờ tí...
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapMutations
} from 'vuex'
import dbRequest from '../../apis/dbRequest'

export default {
    name: "ModalAddPermission",
    data() {
        return {
            Role: {},
            isUpdated: true,
            isMessage: false,
            message: "",
            type: "",
            permissionName: "",
            isDisabled: false
        }
    },
    props: ["modal"],
    methods: {
        ...mapMutations(["insertPermission"]),
        clearAlert() {
            this.isMessage = false
        },
        addPermission() {
            const permissionName = this.permissionName
            dbRequest.createPermission(permissionName)
                .then((data) => {
                    console.log(data)
                    this.isMessage = true
                    this.type = "success"
                    this.message = "Thêm Permission thành công"
                    this.insertPermission(data)
                    this.isDisabled = true
                })
                .catch((error) => {
                    this.isMessage = true
                    this.type = "danger"
                    this.message = error
                })
        },
    },
}
</script>

<style>

</style>
