<template>
<div class="noti-icon px-2">
    <div class="position-relative">
        <div class="dropdown">
            <a id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-users noti circle-icon"></i>
            </a>
            <span class="position-absolute top-1 start-100 translate-right badge rounded-pill bg-warning">
                {{ usersLogin.length }}
                <span class="visually-hidden">unread messages</span>
            </span>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li v-for="(user, idx) in usersLogin" :key="idx">
                    <a class="dropdown-item" href="#">{{isYour(user)}}</a>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "OnlineIcon",
    data() {
        return {
            username: ""
        }
    },
    created() {
        this.username = this.getUser.username
    },
    computed: {
        ...mapGetters(["getUser", "getUsersLogin"]),
        usersLogin() {
            const users = this.getUsersLogin
            let filterUsers = users.filter(ele => ele !== this.username)
            filterUsers.unshift(this.username)
            return filterUsers
        }
    },
    methods: {
        isYour(user) {
            return user !== this.username ? user : `You(${user})`
        }
    },
}
</script>

<style>
.noti-icon {
    display: block;
    padding: 0.5rem 1rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.noti {
    color: rgba(255, 255, 255, 0.55);
    cursor: pointer;
}

.circle-icon {
    background: rgba(255, 255, 255, 0.3);
    padding: 0.5rem;
    border-radius: 50%;
}

.noti:hover {
    color: rgba(255, 255, 255, 0.75);
}

.translate-right {
    transform: translate(-35%, -30%)
}

.badge {
    font-size: 0.6rem !important;
}
</style>
