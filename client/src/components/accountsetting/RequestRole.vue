<template>
<main>
    <div class="container-fluid p-2 d-flex justify-content-center">
        <div class="card p-3 min-width">
            <h5 class="mb-3 m-auto">Request Role</h5>
            <form>
                <span>Select Role</span>
                <select @change="changeSelection" class="form-select mb-3" v-model="selectionRole">
                    <option class="role" :value="role" v-for="(role, idx) in getRoles" :key="idx">
                        {{role}}
                    </option>
                </select>
                <span>Enter content to send to Management</span>
                <textarea class="form-control mb-3" placeholder="exp: Xin chào! Tôi là User mới, xin được cấp quyền admin" v-model="content"></textarea>
                <div v-if="isMessage" :class='"alert alert-" + type' role="alert">
                    {{ message }}
                </div>
                <div class="text-center">
                    <button v-if="isRequest" type="button" class="btn btn-primary col-5" @click="submit">Send Request</button>
                    <button v-else class="btn btn-primary" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Chờ tí...
                    </button>
                </div>
            </form>
        </div>

    </div>

</main>
</template>

<script>
import {
    mapGetters,
    mapMutations
} from 'vuex';
import dbRequest from '../../apis/dbRequest';
import roleRequest from '../../apis/dbRequest/roleRequest';

export default {
    name: "RequestRole",
    components: {},
    data() {
        return {
            isMessage: false,
            message: "",
            type: "",
            isRequest: true,
            selectionRole: "",
            roles: [],
            content: ""
        }
    },
    computed: {
        ...mapGetters(["getRoles", "getUser"]),
    },
    created() {
        dbRequest.getAllRoles()
            .then((data) => {
                data.data.forEach(ele => {
                    this.roles.push(ele.name)
                });
                this.setRoles(this.roles)
            })
            .catch((err) => {
                this.isMessage = true
                this.message = err
            })
    },
    methods: {
        ...mapMutations(["setRoles"]),
        changeSelection() {
            this.isMessage = false
        },
        showAlert(type, message) {
            this.isMessage = true
            this.message = message
            this.type = type
        },
        submit() {
            if (this.selectionRole.length > 0) {
              this.isRequest = false
              const user = this.getUser
              const email = user.email
              roleRequest.requestRole(email, this.selectionRole, this.content)
              .then(result => {
                this.isRequest = true
                this.showAlert("success", result.data)
              })
              .catch(err => {
                this.isRequest = true
                this.showAlert("danger", err)
              })
            } else {
                this.showAlert("danger", "Bạn chưa chọn Role")
            }
        }
    }
}
</script>

<style>

</style>
