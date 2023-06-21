import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "./utils/auth.guard";
import { adminRoot } from "./constants/config";
import { UserRole } from "./utils/auth.roles";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "./views/initial-page"),
  },
  {
    path: adminRoot,
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: `${adminRoot}/home`,
    meta: { loginRequired: true },
    /*
    define with Authorization :
    meta: { loginRequired: true, roles: [UserRole.Admin, UserRole.Editor] },
    */
    children: [
      {
        path: "home",
        component: () =>
          import(
            /* webpackChunkName: "app" */ "./views/app/dragndrop/Home"
          ),
        // meta: { roles: [UserRole.Admin] },
      },
      {
        path: "websites",
        component: () =>
          import(
            /* webpackChunkName: "app" */ "./views/app/dragndrop/Websites"
          ),
        // meta: { roles: [UserRole.Admin] },
      },
      {
        path: "editor/:websiteId",
        component: () =>
          import(
            /* webpackChunkName: "app" */ "./views/app/dragndrop/Editor"
          ),
        // meta: { roles: [UserRole.Admin] },
      },
    ],
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login"),
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register"),
      },
      // {
      //   path: "forgot-password",
      //   component: () =>
      //     import(/* webpackChunkName: "user" */ "./views/user/ForgotPassword")
      // },
      // {
      //   path: "reset-password",
      //   component: () =>
      //     import(/* webpackChunkName: "user" */ "./views/user/ResetPassword")
      // },
    ],
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error"),
  },
  {
    path: "/unauthorized",
    component: () =>
      import(/* webpackChunkName: "error" */ "./views/Unauthorized"),
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error"),
  },
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history",
});
router.beforeEach(AuthGuard);
export default router;
