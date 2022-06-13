<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="errorRoleModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title mt_warning" id="modalLabel">Cảnh báo !!!</h5>
            </div>
            <div class="modal-body">
                Bạn không có quyền để sử dụng chức năng này. Vui lòng liên hệ quản trị viên.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: "ModalErrorRole"
}
</script>

<style>
</style>
