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
              table-wrapper
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

                    <table table class="table table-striped table-dark table-hover table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Hệ thống</th>
                                <th>Thông tin cảnh báo</th>
                                <th>Kiểu ALARM</th>
                                <th>Trạng thái</th>
                                <th>Kênh cảnh báo</th>
                                <th>Thời gian</th>
                            </tr>
                        </thead>

                        <tbody id="realtime-content">
                            <tr v-for="(item, idx) in items" :key="idx">
                                <td>{{ item?.name }}</td>
                                <td>{{ item?.content }}</td>
                                <td>{{ item?.style }}</td>
                                <td>{{ item?.status }}</td>
                                <td>{{ item?.contact }}</td>
                                <td>{{ item?.time }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <TableBottom/> -->
                    <!-- <div class="input-group mb-3 ">
              <span class="input-group-text" id="basic-addon3">Change Time Request to DB</span>
              <input type="number" class="form-control input-change" placeholder="input > 0" v-model="changeTime">
              <button class="btn btn-outline-secondary" type="button" @click="change" >Change</button>
              <span class="text-counter">{{ counter }}s</span>
            </div> -->
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
import redisRequest from '../../redisRequest'
export default {
    name: "RealTime",
    data() {
        return {
            items: [],
            isLoading: true,
        };
    },
    created() {
        redisRequest.getIndexStore("realtime").then((res) => {
            this.items = res.data
            this.isLoading = false
        }).catch((err) => {
            console.log(err)
        }),
        document.title = "Trực tuyến"
    },
    sockets: {
        realtime: function (data) {
          this.items.unshift(data)
        }
    }
};
</script>

<style>
</style>
