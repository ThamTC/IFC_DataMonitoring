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
                <div class="row" v-for="(permission, idx) in getPermissions" :key="idx">
                    <div class="col-md-6">
                        <span>Permission Name</span>
                        <input disabled :value="permission.name" class="form-control" id="inputPermissionnameModal" type="text" />
                    </div>
                    <div class="col-md-6">
                        <!-- <div class="form-floating mb-3"> -->
                        <span>Select permission</span>
                        <select :id="permission.name" class="form-select" name="permission_select">
                            <option value="0" selected>Null(default)</option>
                            <option value="1">Read</option>
                            <option value="2">Write</option>
                        </select>
                        <!-- </div> -->
                    </div>
                </div>
            </div>

            <div v-if="isMessage" :class='"alert mx-3 alert-" + type' role="alert">
                {{ message }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                <button v-if="isAdded" type="button" class="btn btn-primary" @click="addRole" :disabled="isDisabled">Có</button>
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
import { mapGetters } from 'vuex'
import dbRequest from '../../apis/dbRequest/index'

export default {
    name: "ModalDeleteUser",
    data() {
        return {
            user: {},
            isAdded: true,
            isMessage: false,
            message: "",
            isDisabled: false,
            permissions: [],
            rolename: "",
            permissionName: ""
        }
    },
    props: ["modal"],
    computed: {
        ...mapGetters(["getPermissions"])
    },
    updated() {},
    methods: {
        addRole() {
            document.getElementsByName("permission_select").forEach(ele => {
                this.permissions.push({name: ele.id, value: ele.value})
            })
            dbRequest.createRole(this.rolename, JSON.stringify(this.permissions))
            .then((data) => {
                console.log(data)
            })
            .catch((error) => console.log(error))
        }
    },
    mounted() {},
}
</script>

<style>

</style>
