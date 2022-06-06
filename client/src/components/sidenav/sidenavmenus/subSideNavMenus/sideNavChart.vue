<template>
<div>
    <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseChart" aria-expanded="false" aria-controls="collapseChart">
        <div class="sb-nav-link-icon"><i class="fas fa-chart-bar"></i></div>
        Chart
        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
    </a>
    <div class="collapse" id="collapseChart" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
        <nav class="sb-sidenav-menu-nested nav">
            <router-link tag="a" class="nav-link" to="/chart/realtime" active-class="active" exact>
                <div class="sb-nav-link-icon">
                    <i class="fas fa-users-cog"></i>
                </div>
                Realtime
            </router-link>

            <router-link tag="a" class="nav-link" to="/chart/statistic" active-class="active">
                <div class="sb-nav-link-icon">
                    <i class="fas fa-user-tag"></i>
                </div>
                Statistic
            </router-link>
        </nav>
    </div>
</div>
</template>

<script>
export default {
    name: "SideNavChart"
}
</script>

<style>

</style>
