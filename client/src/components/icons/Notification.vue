<template>
<div class="noti-icon px-3">
    <div class="position-relative">
        <i class="fas fa-bell noti circle-icon"></i>
        <span class="position-absolute top-1 start-100 translate-right badge rounded-pill bg-warning">
            99+
            <span class="visually-hidden">unread messages</span>
        </span>
    </div>
</div>
</template>

<script>
export default {

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

.translate-right{
    transform: translate(-35%, -30%)
}
.badge {
    font-size: 0.6rem !important;
}
</style>
