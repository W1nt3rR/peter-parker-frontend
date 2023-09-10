import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IUserData } from "@/api/authApi";

export const useStore = defineStore("store", () => {
    // Data
    const user = ref<IUserData | null>(null);

    return {
        user,
    };
});
