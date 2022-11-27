<template>
  <div class="mt-5 bt-search">
    <InputSearch v-model="searchText" />
  </div>
  <div class="page row">
    <div class="mt-5 col-md-12">
      <h2>
        Danh sách điểm du lịch
      </h2>
      <br>
      <TouristAttractionList
        v-if="filteredTouristAttractionsCount > 0"
        :touristAttractions="filteredTouristAttractions"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có điểm du lịch nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo" /> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddTouristAttraction">
          <i class="fas fa-plus" /> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="onDeleteTouristAttractions">
          <i class="fas fa-trash" /> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-5 col-md-12">
      <div v-if="activeTouristAttraction">
        <h2>
          Chi tiết Điểm du lịch
        </h2>
        <br>
        <TouristAttractionCard :touristAttraction="activeTouristAttraction" />
        <router-link
          :to="{
            name: 'touristAttraction.edit',
            params: { id: activeTouristAttraction.id },
          }"
        >
          <span class="mt-2 badge badge-warning mb-5">
            <i class="fas fa-edit" /> Hiệu chỉnh</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import TouristAttractionCard from "@/components/TouristAttractionCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import TouristAttractionList from "@/components/TouristAttractionList.vue";
import { touristAttractionService } from "@/services/touristAttraction.service";
export default {
  components: {
    TouristAttractionCard,
    InputSearch,
    TouristAttractionList,
  },
  // The full code will be presented below
  data() {
    return {
      touristAttractions: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Monitor changes on searchText.
    // Release the currently selected contact.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Map contacts to strings for searching.
    touristAttractionsAsStrings() {
      return this.touristAttractions.map((touristAttraction) => {
        const { name, address, area, fare } = touristAttraction;
        return [name, address, area, fare].join("");
      });
    },
    // Return contacts filtered by the search box.
    filteredTouristAttractions() {
      if (!this.searchText) return this.touristAttractions;
      return this.touristAttractions.filter((touristAttraction, index) =>
        this.touristAttractionsAsStrings[index].includes(this.searchText)
      );
    },
    activeTouristAttraction() {
      if (this.activeIndex < 0) return null;
      return this.filteredTouristAttractions[this.activeIndex];
    },
    filteredTouristAttractionsCount() {
      return this.filteredTouristAttractions.length;
    },
  },
  methods: {
    async retrieveTouristAttractions() {
      try {
        const touristAttractionsList = await touristAttractionService.getMany();
        this.touristAttractions = touristAttractionsList.sort((current, next) =>
          current.name.localeCompare(next.name)
        );
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveTouristAttractions();
      this.activeIndex = -1;
    },
    async onDeleteTouristAttractions() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await touristAttractionService.deleteMany();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddTouristAttraction() {
      this.$router.push({ name: "touristAttraction.add" });
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
