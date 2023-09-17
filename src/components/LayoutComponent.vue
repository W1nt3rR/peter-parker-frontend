<template>
    <div id="layout">
        <nav>
            <div>{{ store.user? store.user.email : "logged out" }}</div>
            <ButtonComponentVue
                v-if="dialogStore.zoneEditing"
                label="Cancel Editing"
                :callback="() => dialogStore.toggleEditingZone(true)"
            />
            <ButtonComponentVue
                v-if="dialogStore.zoneEditing"
                label="Finish Editing"
                :callback="dialogStore.toggleEditingZone"
            />
            <AvatarComponent />
        </nav>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    import useStore from "@/stores/store";

    // Components
    import AvatarComponent from "./AvatarComponent.vue";
    import ButtonComponentVue from "./button/ButtonComponent.vue";
    import useDialogStore from "@/stores/dialogStore";

    const store = useStore();
    const dialogStore = useDialogStore();
</script>

<style scoped lang="scss">
    #layout {
        display: flex;
        flex-direction: column;
        height: 100vh;

        nav {
            background-color: #333;
            color: #fff;
            padding: 0.75rem;
            height: 4rem;

            display: flex;
            justify-content: space-between;
        }
    }
</style>
