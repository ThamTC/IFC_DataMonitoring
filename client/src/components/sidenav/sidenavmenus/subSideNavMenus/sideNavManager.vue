<template>
<div>
    <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseManager" aria-expanded="false" aria-controls="collapseManager">
        <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
        Manager
        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
    </a>
    <div class="collapse" id="collapseManager" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
        <nav class="sb-sidenav-menu-nested nav">
            <router-link tag="a" class="nav-link" to="/managerUser" active-class="active" exact>
                <div class="sb-nav-link-icon">
                    <i class="fas fa-users-cog"></i>
                </div>
                Users
            </router-link>
            <router-link tag="a" class="nav-link" to="/managerRole" active-class="active" exact>
                <div class="sb-nav-link-icon">
                    <i class="fas fa-users-cog"></i>
                </div>
                Roles
            </router-link>
            <router-link tag="a" class="nav-link" to="/managerPermission" active-class="active">
                <div class="sb-nav-link-icon">
                    <i class="fas fa-user-tag"></i>
                </div>
                Permissions
            </router-link>
        </nav>
    </div>
</div>
</template>

<script>
export default {
    name: "SideNavManager"
}
</script>

<style>

</style>
