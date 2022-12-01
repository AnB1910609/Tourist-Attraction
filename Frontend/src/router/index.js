import { createWebHistory, createRouter } from "vue-router";
import TouristAttraction from "@/views/TouristAttraction.vue";
import Plan from "@/views/Plan.vue";
import TouristAttractionAdmin from "@/views/TouristAttractionAdmin.vue";
const routes = [
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
  {
    path: "/plans/:id",
    name: "plan.edit",
    component: () => import("@/views/PlanEdit.vue"),
    props: (route) => ({ planId: parseInt(route.params.id) }),
  },
  {
    path: "/plan",
    name: "plan",
    component: Plan,
  },
  {
    path: "/planAdd",
    name: "touristAttractionPlan.add",
    component: () => import("@/views/TouristAttractionAddPlan.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/",
    name: "touristAttraction",
    component: TouristAttraction,
  },
  {
    path: "/admin",
    name: "admin",
    component: TouristAttractionAdmin,
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
