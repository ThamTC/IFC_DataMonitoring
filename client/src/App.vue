<template>
    <div>
        <router-view name="navbar"></router-view>
        <router-view></router-view>
        <!-- <Footer></Footer> -->
        <div id="myToast"></div>
    </div>
</template>

<script>
import {
    mapGetters,
    mapMutations
} from "vuex";
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import permissionRequest from './apis/dbRequest/permissionRequest';
import socketIo from './socket.io';

export default {
    name: "App",
    components: {
        NavBar,
        Footer
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    created() {
        permissionRequest.getAllPermissions()
            .then(res => {
                this.setPermissionDetails(res.data.map(ele => {
                    return {
                        id: ele.id,
                        name: ele.name
                    }
                }))
            })
            .catch(error => {
                console.log(error)
            })
        socketIo.init(this.getUser)
    },
    methods: {
        ...mapMutations(["setPermissionDetails"]),
    },
    sockets: socketIo
};
</script>
