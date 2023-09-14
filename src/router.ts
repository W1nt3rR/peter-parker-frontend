import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from "vue-router";
import Cookies from "js-cookie";

import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {
                authRequired: true,
            },
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/register",
            name: "register",
            component: RegisterView,
        },
    ],
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (to.matched.some((record) => record.meta.authRequired)) {
        if (!Cookies.get("refresh-token")) {
            next({ name: "login" });
        } else {
            next();
        }
    } else {
        next();
    }

    next();
});

export default router;
