<template>
<div class="text-xxl-center fw-bold">
    <span>Chào mừng bạn đến Website giám sát hệ thống của Ban điều hành hệ thống IFC.</span>
    <br>
    <span v-if="isUserAcc" class="text-red">Bạn không có quyền để xem một số tính năng quan trọng của website. Vui lòng liên hệ quản trị viên.</span>
    <span v-else>Hãy chọn chức năng bên trái</span>
</div>
</template>

<script>
import { lowerCase } from 'lodash'
import { mapGetters } from 'vuex'
import SideNav from './SideNav.vue'
export default {
    name: "Default",
    components: {
        SideNav
    },
    data() {
      return {
        user: null
      }
    },
    computed: {
      ...mapGetters(["getUser"]),
      isUserAcc() {
        this.user = this.getUser
        if (lowerCase(this.user.role) == "user") {
          return true
        }
        return false
      }
    }
}
</script>

<style>

</style>
