import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
    // Data
    const user = ref(null);

    return {
        user,
    };
});
