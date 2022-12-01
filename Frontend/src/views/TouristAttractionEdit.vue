<template>
  <div v-if="touristAttraction" class="page mt-5">
    <h2>Chỉnh sửa điểm du lịch</h2>
    <TouristAttractionForm
      :touristAttraction="touristAttraction"
      @submit:touristAttraction="onUpdateTouristAttraction"
      @delete:touristAttraction="onDeleteTouristAttraction"
    />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import TouristAttractionForm from "@/components/TouristAttractionForm.vue";
import { touristAttractionService } from "@/services/touristAttraction.service";
export default {
  components: {
    TouristAttractionForm,
  },
  props: {
    touristAttractionId: { type: Number, required: true },
  },
  data() {
    return {
      touristAttraction: null,
      message: "",
    };
  },
  methods: {
    async getTouristAttraction(id) {
      try {
        this.touristAttraction = await touristAttractionService.get(id);
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
    async onUpdateTouristAttraction(touristAttraction) {
      try {
        await touristAttractionService.update(touristAttraction.id, touristAttraction);
        this.message = "Điểm du lịch được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },
    async onDeleteTouristAttraction(id) {
      if (confirm("Bạn muốn xóa Điểm du lịch này?")) {
        try {
          await touristAttractionService.delete(id);
          this.$router.push({ name: "touristAttraction" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getTouristAttraction(this.touristAttractionId);
    this.message = "";
  },
};
</script>
