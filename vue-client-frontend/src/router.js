import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
        path: "/",
        alias: "/connection",
        name: "logon",
        component: () => import("./views/Logon")
      },
    {
      path: "/inscription",
      alias: "/inscription",
      name: "signup",
      component: () => import("./views/Signup")
    },
    {
      path: "/page_principale",
      alias: "/page_principale",
      name: "mainPage",
      component: () => import("./views/MainPage")
    },
    {
      path: "/tous_articles",
      alias: "/tous_articles",
      name: "mainPage",
      component: () => import("./views/AllArticles")
    }
  ]
});
