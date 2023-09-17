import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IUserData } from "@/api/authApi";

const useStore = defineStore("store", () => {
    // Data
    const user = ref<IUserData | null>(null);

    return {
        user,
    };
});

export default useStore;
