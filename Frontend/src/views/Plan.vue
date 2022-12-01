<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mt-5 bt-search">
    <InputSearchPlan v-model="searchText" />
  </div>
  <div class="page row">
    <div class="mt-5 col-md-12">
      <h2>Danh sách kế hoạch du lịch</h2>
      <br />
      <PlanList
        v-if="filteredPlansCount > 0"
        :plans="filteredPlans"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có kế hoạch du lịch nào.</p>
    </div>
    <div class="mt-5 mb-5 col-md-12">
      <div v-if="activePlan">
        <h2>Chi tiết kế hoạch du lịch</h2>
        <br />
        <PlanCard :plan="activePlan" />
        <router-link
          :to="{
            name: 'plan.edit',
            params: { id: activePlan.id },
          }"
        >
          <span class="mt-3 badge badge-warning mb-5">
            <i class="fas fa-edit" /> Chỉnh sửa</span
          >
        </router-link>
      </div>
      <div class="mt-3 mb-5 row justify-content-around">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo" /> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddPlan()">
          <i class="fas fa-plus" /> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="onDeletePlans">
          <i class="fas fa-trash" /> Xóa tất cả
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import PlanCard from "@/components/PlanCard.vue";
import InputSearchPlan from "@/components/InputSearchPlan.vue";
import PlanList from "@/components/PlanList.vue";
import { planService } from "@/services/plan.service";
import { useRoute, useRouter } from "vue-router";
import firebase from "firebase/compat";
import { onBeforeMount } from "vue";
export default {
  components: {
    PlanCard,
    InputSearchPlan,
    PlanList,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace("/");
        }
      });
    });
  },
  data() {
    return {
      plans: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    plansAsStrings() {
      return this.plans.map((plan) => {
        const { username, tourname, numbersofdays, cost } = plan;
        return [username, tourname, numbersofdays, cost].join("");
      });
    },
    filteredPlans() {
      if (!this.searchText) return this.plans;
      return this.plans.filter((plan, index) =>
        this.plansAsStrings[index].includes(this.searchText)
      );
    },
    activePlan() {
      if (this.activeIndex < 0) return null;
      return this.filteredPlans[this.activeIndex];
    },
    filteredPlansCount() {
      return this.filteredPlans.length;
    },
  },
  methods: {
    async retrievePlans() {
      try {
        const plansList = await planService.getMany();
        this.plans = plansList.sort((current, next) =>
          current.username.localeCompare(next.username)
        );
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrievePlans();
      this.activeIndex = -1;
    },
    async onDeletePlans() {
      if (confirm("Bạn muốn xóa tất cả kế hoạch du lịch?")) {
        try {
          await planService.deleteMany();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddPlan() {
      this.$router.push({ name: "touristAttractionPlan.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.page {
  text-align: left;
  max-width: 1500px;
}

.bt-search {
  margin-left: 25%;
  max-width: 50%;
}
</style>
