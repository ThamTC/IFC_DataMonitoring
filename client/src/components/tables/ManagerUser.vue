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
                    <div class="dataTable-top">
                        <!-- <div class="dataTable-dropdown">
                        <label>
                            <select class="dataTable-selector">
                                <option value="5">5</option>
                                <option value="10" selected="">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                            </select>
                        entries per page
                        </label>
                    </div>
                    <div class="dataTable-search">
                        <input class="dataTable-input" placeholder="Search..." type="text">
                    </div> -->
                    </div>
                    <div class="table-wrapper">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Date Created</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, idx) in users" :key="idx">
                                    <td>{{ idx+1 }}</td>
                                    <td>{{ user.username }}</td>
                                    <td>{{ user.createdAt }}</td>
                                    <td>{{ user.role }}</td>
                                    <td><span class="status text-success">&bull;</span> Active</td>
                                    <td>
                                        <a href="#" class="settings" title="Settings" data-toggle="tooltip"><i class="fas fa-cog"></i></a>
                                        <a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="fas fa-user-times"></i></a>
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
    name: "ManagerUsers",
    data() {
        return {
            isLoading: true,
            users: []
        };
    },
    mounted() {
        // get all user from DB
        dbRequest.getAllUsers().then((data) => {
            this.users = data.data
            this.isLoading = false
        })
        .catch((err) => {
            console.log(err)
        })
    },
};
</script>

<style>
</style>
