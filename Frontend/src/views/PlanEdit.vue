<template>
  <div v-if="plan" class="page mt-5">
    <h2>Chỉnh sửa kế hoạch du lịch</h2>
    <PlanForm
      :plan="plan"
      @submit:plan="onUpdatePlan"
      @delete:[plan]="onDeletePlan"
    />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import PlanForm from "@/components/TouristAttractionFormPlan.vue";
import { planService } from "@/services/plan.service";
export default {
  components: {
    PlanForm,
  },
  props: {
    planId: { type: Number, required: true },
  },
  data() {
    return {
      plan: null,
      message: "",
    };
  },
  methods: {
    async getPlan(id) {
      try {
        this.plan = await planService.get(id);
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async onUpdatePlan(plan) {
      try {
        await planService.update(plan.id, plan);
        this.message = "Kế hoạch du lịch được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },
    async onDeletePlan(id) {
      if (confirm("Bạn muốn xóa kế hoạch du lịch này?")) {
        try {
          await planService.delete(id);
          this.$router.push({ name: "plan" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getPlan(this.planId);
    this.message = "";
  },
};
</script>
