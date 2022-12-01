<script>
export default {
  props: {
    plans: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>
<template>
  <ul class="list-group">
    <div
      class="list-group-item font-text"
      v-for="(plan, index) in plans"
      :key="plan.id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      <div>
        {{ plan.username }}
      </div>
    </div>
    
  </ul>
  <br>
</template>
<style scoped>
.font-text {
  font-size: 20px;
  font-weight: bold;
}
</style>