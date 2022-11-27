import { createWebHistory, createRouter } from "vue-router";
import TouristAttraction from "@/views/TouristAttraction.vue";
const routes = [
  {
    path: "/",
    name: "touristAttraction",
    component: TouristAttraction,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/touristAttractions/:id",
    name: "touristAttraction.edit",
    component: () => import("@/views/TouristAttractionEdit.vue"),
    props: (route) => ({ touristAttractionId: parseInt(route.params.id) }),
  },
  {
    path: "/touristAttractions",
    name: "touristAttraction.add",
    component: () => import("@/views/TouristAttractionAdd.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
