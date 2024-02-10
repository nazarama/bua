import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from "vue-router";
import ViewAbout from "../views/ViewAbout.vue"
import ViewEvents from "../views/ViewEvents.vue"
import ViewPodcasts from "../views/ViewPodcasts.vue"
import ViewHome from "../views/ViewHome.vue"
import AdminViewHomeEvent from "../views/admin/ViewHome.vue"
import AdminViewHomePodcast from "../views/admin/ViewHomePodcast.vue"
import EventView from "../views/EventView.vue"
import PodcastView from "../views/PodcastView.vue"

const routes: Array<RouteRecordRaw> = [

  {
    path: "/",
    name: "Home",
    component: ViewHome
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
     component: ViewAbout
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
     component: ViewEvents
   },
   {
     path: "/podcasts",
     name: "Podcasts",
     component: ViewPodcasts
   },
   {
     path: "/admin/hdujrickshyt23456jkd0927hdkcodjyyjkicccjdjdkdjfj",  //"/admin/home",
     name: "AdminHomeEvent",
     component: AdminViewHomeEvent
   },
   {
    path: "/admin/podcstshyt23456jkd0927hdkcodjyyjkicccjdjdkdjfj",  //"/admin/home",
    name: "AdminHomePodcast",
    component: AdminViewHomePodcast
  },
   {
    path: '/event/:eventId/:clubId',
    name: 'Event',
    component: EventView,
    props: true,
  },
  {
    path: '/podcast/:order',
    name: 'Podcast',
    component: PodcastView,
    props: true,
  },
];

const router = createRouter({
  history:  createWebHistory(),
  routes,
});

export default router;
