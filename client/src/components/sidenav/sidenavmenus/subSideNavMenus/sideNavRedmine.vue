<template>
<div>
    <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseRedmine" aria-expanded="false" aria-controls="collapseRedmine">
        <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
        Redmine
        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
    </a>
    <div class="collapse" id="collapseRedmine" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
        <nav class="sb-sidenav-menu-nested nav">
            <router-link tag="a" class="nav-link" :to="{name: 'issue'}" active-class="active" exact>
                <div class="sb-nav-link-icon">
                    <i class="fas fa-tasks"></i>
                </div>
                Tasks
            </router-link>
        </nav>
        <nav class="sb-sidenav-menu-nested nav">
            <router-link tag="a" class="nav-link" :to="{name: 'redmine_statistic'}">
                <div class="sb-nav-link-icon">
                    <i class="fas fa-chart-pie"></i>
                </div>
                Statistics
            </router-link>
        </nav>
    </div>
</div>
</template>

<script>
export default {
    name: "SideNavRedmine"
}
</script>

<style>

</style>
