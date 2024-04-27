import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from "vue-router";
import ViewAbout from "../views/ViewAbout.vue";
import ViewEvents from "../views/ViewEvents.vue";
import ViewPodcasts from "../views/ViewPodcasts.vue";
import ViewHome from "../views/ViewHome.vue";
import AdminViewNewEvent from "../views/admin/ViewNewEvent.vue";
import AdminViewNewPodcast from "../views/admin/ViewNewPodcast.vue";
import EventView from "../views/EventView.vue";
import PodcastView from "../views/PodcastView.vue";
import AdminViewLineup from "../views/admin/ViewLineup.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: ViewHome,
    //() => import('../views/ViewAbout.vue'),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/ViewAbout.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: ViewAbout,
    //() => import('../views/ViewAbout.vue'),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/ViewAbout.vue"),
  },
  {
    path: "/events",
    name: "Events",
    component: ViewEvents,
  },
  {
    path: "/podcasts",
    name: "Podcasts",
    component: ViewPodcasts,
  },
  {
    path: "/admin/hdujrickshyt23456jkd0927hdkcodjyyjkicccjdjdkdjfj", //"/admin/home",
    name: "AdminHomeEvent",
    component: AdminViewNewEvent,
  },
  {
    path: "/admin/podcstshyt23456jkd0927hdkcodjyyjkicccjdjdkdjfj", //"/admin/home",
    name: "AdminHomePodcast",
    component: AdminViewNewPodcast,
  },
  {
    path: "/admin/lineupd09djduiisnssddddddwrety", //"/admin/home",
    name: "AdminLineup",
    component: AdminViewLineup,
  },
  {
    path: "/event/:eventId/:clubId",
    name: "Event",
    component: EventView,
    props: true,
  },
  {
    path: "/podcast/:order",
    name: "Podcast",
    component: PodcastView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
