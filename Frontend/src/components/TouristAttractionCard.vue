<script>
export default {
  props: {
    touristAttraction: { type: Object, required: true },
  },
};
</script>
<template>
  <div class="page">
    <div class="p-1">
      <strong>Tên điểm du lịch:</strong>
      {{ touristAttraction.name }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ touristAttraction.address }}
    </div>
    <div class="p-1">
      <strong>Mô tả:</strong>
      {{ touristAttraction.describe }}
    </div>
    <div class="p-1">
      <strong>Giá tham quan:</strong>
      {{ touristAttraction.fare }}
      vnd
    </div>
    <div class="p-1">
      <strong>Điểm tham quan yêu thích:&nbsp;</strong>
      <i v-if="touristAttraction.favorite" class="fas fa-check" />
      <i v-else class="fas fa-times" />
    </div>
  </div>
</template>
<style scoped>
.page {
  font-size: 20px;
}
</style>