<template>
<main>
    <div class="container-fluid p-2">
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
                <div class=" dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns ">
                    <div class="dataTable-top">
                    </div>
                    <div class="table-wrapper">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>View Realtime</th>
                                    <th>View Statistic</th>
                                    <th>View ManagerUser</th>
                                    <th>View ManagerRole</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(role, idx) in roles" :key="idx">
                                    <td>{{role.name}}</td>
                                    <td>
                                        <i v-if="isViewRealtime(idx)" class="fas fa-check icon-green"></i>
                                        <i v-else class="fas fa-times icon-red"></i>
                                    </td>
                                    <td>
                                        <i v-if="isViewStatistic(idx)" class="fas fa-check icon-green"></i>
                                        <i v-else class="fas fa-times icon-red"></i>
                                    </td>
                                    <td>
                                        <i v-if="isViewManagerUser(idx)" class="fas fa-check icon-green"></i>
                                        <i v-else class="fas fa-times icon-red"></i>
                                    </td>
                                    <td>
                                        <i v-if="isViewManagerRole(idx)" class="fas fa-check icon-green"></i>
                                        <i v-else class="fas fa-times icon-red"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
import dbRequest from '../../apis/dbRequest'

export default {
    name: "ManagerRole",
    data() {
        return {
            isLoading: true,
            roles: []
        }
    },
    created() {
        document.title = "Quản lý Role"
        dbRequest.getAllRoles()
        .then((data) => {
            this.isLoading = false
            this.roles = data.data
            console.log(data.data)
        })
        .catch((error) => console.log(error))
    },
    methods: {
        isViewRealtime(idx) {
            return this.roles[idx].permission.includes("view-realtime")
        },
        isViewStatistic(idx) {
            return this.roles[idx].permission.includes("view-statistic")
        },
        isViewManagerUser(idx) {
            return this.roles[idx].permission.includes("view-managerUser")
        },
        isViewManagerRole(idx) {
            return this.roles[idx].permission.includes("view-managerRole")
        }
    },
}
</script>

<style>

</style>
