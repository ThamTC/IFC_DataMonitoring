<template>
<main>
    <div class="container-fluid p-2">
        <div class="card p-3">

            <div class="d-flex align-items-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="d-block ui-w-80">
                <div class="media-body mx-3">
                    <label class="btn btn-outline-primary">
                        Upload new photo
                        <input type="file" class="account-settings-fileinput">
                    </label> &nbsp;
                    <button type="button" class="btn btn-default md-btn-flat">Reset</button>

                    <div class="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                </div>
            </div>
            <hr class="border-light my-2">
            <div class="form-group">
                <label class="form-label">Username</label>
                <input type="text" class="form-control mb-1" value="" placeholder="admin.ifc">
            </div>
            <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" value="" placeholder="admin">
            </div>
            <div class="form-group">
                <label class="form-label">E-mail</label>
                <input type="text" class="form-control mb-1" value="" placeholder="admin.ifc@gmail.com">
                <div class="alert alert-warning mt-3">
                    Your email is not confirmed. Please check your inbox.<br>
                    <a href="javascript:void(0)">Resend confirmation</a>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Company</label>
                <input type="text" class="form-control" value="" placeholder="IFC">
            </div>
        </div>

    </div>

</main>
</template>

<script>
export default {
    name: "General"
}
</script>

<style>

</style>
