import Vue from "vue";
import VueRouter from "vue-router";
import Listing from "../views/Listing";
import Details from "../views/Details";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Listing",
    component: Listing
  },
  {
    path: "/show/:id",
    name: "Details",
    component: Details
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
