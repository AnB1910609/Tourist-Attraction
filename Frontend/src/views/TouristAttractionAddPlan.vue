<template>
  <div class="page mt-5">
    <h2>Thêm kế hoạch du lịch</h2>
    <TouristAttractionFormPlan :plan="plan" @submit:plan="onUpdatePlan" />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import TouristAttractionFormPlan from "@/components/TouristAttractionFormPlan.vue";
import { planService } from "@/services/plan.service";
export default {
  components: {
    TouristAttractionFormPlan,
  },
  props: {
    planId: { type: Number, required: false },
  },
  data() {
    return {
      plan: null,
      message: "",
    };
  },
  methods: {
    async onUpdatePlan(plan) {
      try {
        await planService.create(plan);
        this.message = "Kế hoạch du lịch được thêm thành công.";
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.plan = {
      username: "",
      tourname: "",
      numbersofdays: "",
      cost: "",
    };
    this.message = "";
  },
};
</script>
