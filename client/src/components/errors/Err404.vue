<template>
    <div id="layoutError">
        <div id="layoutError_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="text-center mt-4">
                                <!-- <a href="https://www.vecteezy.com/free-vector/404"></a> -->
                                <img class="mb-4 img-error" src="/assets/images/404_error.jpg" />
                                <p class="lead">This requested URL was not found on this server.</p>
                                <router-link to="/">
                                    <i class="fas fa-arrow-left me-1"></i>
                                    Return to HomePage
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Err404'
}
</script>

<style>

</style>