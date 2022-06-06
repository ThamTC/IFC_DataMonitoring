<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="addRoleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Role</h5>
            </div>
            <div class="modal-body">
                <div class="row justify-content-center mb-2">
                    <div class="col-md-6">
                        <span>Role Name</span>
                        <input @input="clearAlert" placeholder="exp: user" class="form-control" id="inputRolenameModal" type="text" v-model="rolename" />
                    </div>
                </div>
            </div>

            <div v-if="isMessage" :class='"alert mx-3 alert-" + type' role="alert">
                {{ message }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                <button v-if="isAdded" type="button" class="btn btn-primary" @click="addRole" :disabled="isDisabled">Thêm</button>
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import dbRequest from '../../apis/dbRequest/index'

export default {
    name: "ModalDeleteUser",
    data() {
        return {
            user: {},
            isAdded: true,
            isMessage: false,
            message: "",
            isDisabled: true,
            permissions: [],
            rolename: null,
            permissionName: ""
        }
    },
    props: ["modal"],
    computed: {
        ...mapGetters(["getPermissions", "getPermissionDetails"])
    },
    updated() {},
    methods: {
        ...mapMutations(["insertRole"]),
        clearAlert() {
            if (this.rolename.length > 0) {
                this.isMessage = false
                this.isDisabled = false
            } else {
                this.isDisabled = true
            }
        },
        addRole() {
            document.getElementsByName("permission_select").forEach(ele => {
                this.permissions.push({name: ele.id, value: ele.value})
            })
            dbRequest.createRole(this.rolename)
            .then((data) => {
                this.insertRole(data.data)
                this.isMessage = true
                this.type = "success"
                this.message = "Thêm Role thành công"
                this.isDisabled = true
            })
            .catch((error) => {
                this.isMessage = true
                this.type = "danger"
                this.message = "Thất bại trong quá trình tương tác với DB"
            })
        }
    },
    mounted() {},
}
</script>

<style>

</style>
