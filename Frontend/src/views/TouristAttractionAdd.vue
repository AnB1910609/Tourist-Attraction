<template>
  <div class="page mt-5">
    <h2>Thêm điểm du lịch</h2>
    <TouristAttractionForm :touristAttraction="touristAttraction" @submit:touristAttraction="onUpdateTouristAttraction" />
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
    touristAttractionId: { type: Number, required: false },
  },
  data() {
    return {
      touristAttraction: null,
      message: "",
    };
  },
  methods: {
    async onUpdateTouristAttraction(touristAttraction) {
      try {
        await touristAttractionService.create(touristAttraction);
        this.message = "Điểm du lịch được thêm thành công.";
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.touristAttraction = {
      name: "",
      image: "",
      address: "",
      describe: "",
      fare: "",
      favorite: "",
    };
    this.message = "";
  },
};
</script>
