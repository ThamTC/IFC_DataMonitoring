<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="settingUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">User Setting</h5>
            </div>
            <div class="modal-body">
                <!-- <div class="p-3"> -->
                <form action="" @submit="submit" method="post">
                    <div class="form-floating mb-3">
                        <input @input="changeName" name="username" class="form-control" id="inputUsernameModal" type="text" ref="usernameModal" />
                        <label for="inputUsernameModal">username</label>
                    </div>
                    <select @change="changeSelection" class="form-select" ref="selection" id="selectionRole">
                        <option class="role" :value="role" v-for="(role, idx) in getRoles" :key="idx">{{role}}</option>
                        <!-- <option class="role" value="admin">admin</option>
                        <option class="role" value="user">user</option>
                        <option class="role" value="callcenter">callcenter</option> -->
                    </select>
                    <!-- <div class=" d-flex align-items-center justify-content-between mt-4 mb-0 ">
                    </div> -->
                </form>
                <!-- </div> -->
            </div>
            <div v-if="isMessage" :class='"alert mx-3 alert-" + type' role="alert">
                {{ message }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                <button v-if="isUpdated" type="button" class="btn btn-primary" @click="submit">Cập nhật</button>
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
import dbRequest from '../../apis/dbRequest'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    name: "ModalSettingUser",
    data() {
        return {
            user: {},
            selection: "manager",
            isUpdated: true,
            isMessage: false,
            type: "",
            message: ""
        }
    },
    computed: {
        ...mapGetters(["getManagerUserInfo", "getRoles"])
    },
    updated() {
        this.user = this.getManagerUserInfo
    },
    props: ["modal"],
    methods: {
        ...mapActions(["updateManagerUsers"]),
        changeName() {
            this.isMessage = false
        },
        changeSelection() {
            this.isMessage = false
        },
        submit() {
            this.isUpdated = false
            const userUpdate = {
                email: this.user.email,
                username: this.$refs["usernameModal"].value,
                role: this.$refs["selection"].value,
                createdAt: this.user.createdAt
            }
            // update userinfo to DB
            dbRequest.updateUserInfo(userUpdate).then((data) => {
                // this.modal.hide()
                this.isUpdated = true
                this.isMessage = true
                this.type = "success"
                this.message = "updated success"
                // update users in managerStore
                this.updateManagerUsers(userUpdate)
            }).catch((err) => {
                this.isMessage = true
                this.type = "danger"
                this.message = err
            })
        }
    },
    mounted() {},
}
</script>

<style>

</style>
