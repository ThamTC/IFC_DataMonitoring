<template>
<div>
    <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseBmb" aria-expanded="false" aria-controls="collapseBmb">
        <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
        Warning Data
        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
    </a>
    <div class="collapse" id="collapseBmb" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
        <nav class="sb-sidenav-menu-nested nav">
            <router-link tag="a" class="nav-link" to="/bmb_room/realtime" active-class="active">
                <div class="sb-nav-link-icon">
                    <i class="fas fa-chart-area"></i>
                </div>
                Realtime
            </router-link>
        </nav>
    </div>
</div>
</template>

<script>
export default {
    name: "SideNavBmb"
}
</script>

<style>

</style>