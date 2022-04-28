<template>
<!-- Modal -->
<div ref="modal" class="modal fade" id="doneModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <ModalContentRealtime v-if="content == 'realtime'"></ModalContentRealtime>
        <ModalContentStatistic v-else-if="content == 'statistic'"></ModalContentStatistic>
    </div>
</div>
</template>

<script>
import ModalContentRealtime from './modalcontents/ModalContentRealtime.vue'
import ModalContentStatistic from './modalcontents/ModalContentStatistic.vue'

export default {
    name: "DoneModal",
    components: {
        ModalContentRealtime,
        ModalContentStatistic
    },
    props: ["content"],
}
</script>

<style>

</style>
