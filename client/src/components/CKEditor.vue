<template>
<div>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    <button v-if="isSubmit" class="btn btn-primary mt-2" @click="submitDescr">Submit</button>
    <button v-else class="btn btn-primary mt-2" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Chờ tí...
    </button>
</div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { mapActions } from 'vuex';

export default {
    name: 'CKEditor',
    data() {
        return {
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            isSubmit: true
        };
    },
    props: ["editorProp"],
    methods: {
        ...mapActions(["createDescription"]),
        submitDescr() {
            const payload = {
                issueId: this.editorProp.id,
                content: this.editorData
            }
            this.createDescription(payload)
            .then(result => {
                this.$emit('editor-submit', this.editorData)
                this.editorData = ''
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
}
</script>
