<template>
<div>
    <div v-if="canShowData">
        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseSolar" aria-expanded="false" aria-controls="collapseSolar">
            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
            Solar
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
        </a>
        <div class="collapse" id="collapseSolar" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav">
                <router-link tag="a" class="nav-link" to="/realtime" active-class="active">
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-chart-area"></i>
                    </div>
                    Realtime
                </router-link>
                <router-link tag="a" class="nav-link" to="/statistic" active-class="active">
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-table"></i>
                    </div>
                    Statistic
                </router-link>

            </nav>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Account",
    methods: {

    },
}
</script>

<style>

</style>
