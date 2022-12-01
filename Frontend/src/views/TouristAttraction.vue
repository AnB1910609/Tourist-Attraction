<template>
  <div class="mt-5 bt-search">
    <InputSearch v-model="searchText" />
  </div>
  <div class="page row">
    <div class="mt-5 col-md-12">
      <h2>Danh sách điểm du lịch</h2>
      <br />
      <TouristAttractionList
        v-if="filteredTouristAttractionsCount > 0"
        :touristAttractions="filteredTouristAttractions"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có điểm du lịch nào.</p>
    </div>
    <div class="mt-5 col-md-12">
      <div v-if="activeTouristAttraction">
        <h2>Chi tiết Điểm du lịch</h2>
        <br />
        <TouristAttractionCard :touristAttraction="activeTouristAttraction" />
        <button type="submit" class="mt-5 mb-5 btn btn-primary" @click="goToAddPlan">
          Add to plan
          <i class="fas fa-edit" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import TouristAttractionCard from "@/components/TouristAttractionCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import TouristAttractionList from "@/components/TouristAttractionList.vue";
import { touristAttractionService } from "@/services/touristAttraction.service";
import { useRoute, useRouter } from "vue-router";
import firebase from "firebase/compat";
import { onBeforeMount } from "vue";
export default {
  components: {
    TouristAttractionCard,
    InputSearch,
    TouristAttractionList,
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
      touristAttractions: [],
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
    touristAttractionsAsStrings() {
      return this.touristAttractions.map((touristAttraction) => {
        const { name, address, describe, fare } = touristAttraction;
        return [name, address, describe, fare].join("");
      });
    },
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
