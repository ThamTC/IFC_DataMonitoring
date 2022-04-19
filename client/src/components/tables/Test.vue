<template>
<main>
    <div class="container-fluid px-4">
        <div class="text-center mt-5" v-if="isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="card mb-4" v-else>
            <div class="card-body">
                <div class="
              dataTable-wrapper dataTable-loading
              no-footer
              sortable
              searchable
              fixed-columns
            ">
                    <div class="dataTable-top">
                    </div>
                    <div class="table-wrapper">
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
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
export default {
    name: "Test"
}
</script>

<style>

</style>
