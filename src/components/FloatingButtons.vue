<template>
    <div class="floating-buttons">
        <ButtonComponent
            v-if="!dialogStore.zoneEditing"
            :label="drawing ? 'Cancel' : 'Add Zone'"
            :callback="toggleCreateZone"
        />
        <ButtonComponent
            v-if="dialogStore.zoneEditing"
            label="Cancel"
            :callback="() => dialogStore.toggleEditingZone(true)"
        />
        <ButtonComponent
            v-if="dialogStore.zoneEditing"
            label="Finish"
            :callback="dialogStore.toggleEditingZone"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import useDialogStore from "@/stores/dialogStore";
    import useStore from "@/stores/store";

    // Components
    import ButtonComponent from "./button/ButtonComponent.vue";

    const store = useStore();
    const dialogStore = useDialogStore();

    const drawing = ref(false);

    // Functions
    function toggleCreateZone() {
        if (drawing.value) {
            drawing.value = false;
            store.map?.pm.disableDraw("Poly");
        } else {
            drawing.value = true;
            store.map?.pm.enableDraw("Poly");
        }
    }
</script>

<style scoped lang="scss">
    .floating-buttons {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 1rem;

        z-index: 1000;

        display: flex;
        gap: 10px;
    }
</style>
