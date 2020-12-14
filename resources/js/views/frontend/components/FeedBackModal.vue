<template>
    <div
        class="modal fade"
        id="feedback"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
        data-keyboard="false"
        data-backdrop="static"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                </div>
                <div class="modal-body">
                    Body
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        // $("#feedback").modal("show");
    }
};
</script>

<style></style>
