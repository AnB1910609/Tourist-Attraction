<script>
export default {
  props: {
    plan: { type: Object, required: true },
  },
};
</script>
<template>
  <div class="page">
    <div class="p-1">
      <strong>Tên người du lịch:</strong>
      {{ plan.username }}
    </div>
    <br>
    <div class="p-1">
      <strong>Tên địa điểm du lịch: </strong>
      {{ plan.tourname }}
    </div>
    <br>
    <div class="p-1">
      <strong>Số ngày đi:</strong>
      {{ plan.numbersofdays }}
    </div>
    <br>
    <div class="p-1">
      <strong>Chi phí:</strong>
      {{ plan.cost }}
      vnd
    </div>
  </div>
</template>
<style scoped>
.page {
  font-size: 20px;
}
</style>
