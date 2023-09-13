export default function authMiddleware({ next, router }) {
    if (!localStorage.getItem("refresh-token")) {
        return router.push({ name: "login" });
    }

    return next();
}
