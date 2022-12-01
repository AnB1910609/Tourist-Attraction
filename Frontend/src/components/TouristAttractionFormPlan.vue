<template>
  <Form
    @submit="submitPlan"
    :validation-schema="planFormSchema"
  >
    <div class="form-group">
      <label for="username">Tên người dùng</label>
      <Field
        name="username"
        type="text"
        class="form-control"
        v-model="planLocal.username"
      />
      <ErrorMessage name="username" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="tourname">Tên địa điểm du lịch</label>
      <Field
        name="tourname"
        type="text"
        class="form-control"
        v-model="planLocal.tourname"
      />
      <ErrorMessage name="tourname" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="numbersofdays">Số ngày đi</label>
      <Field
        name="numbersofdays"
        type="number"
        class="form-control"
        v-model="planLocal.numbersofdays"
      />
      <ErrorMessage name="numbersofdays" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="cost">Chi phí chuyến đi</label>
      <Field
        name="cost"
        type="number"
        class="form-control"
        v-model="planLocal.cost"
      />
      <ErrorMessage name="cost" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="planLocal.id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deletePlan"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default { 
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:plan", "delete:plan"],
  props: {
    plan: { type: Object, required: true },
  },
  data() {
    const planFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Tên người dùng phải có giá trị.")
        .min(2, "Tên người dùng phải ít nhất 2 ký tự.")
        .max(255, "Tên người dùng có nhiều nhất 255 ký tự."),
      tourname: yup.string().max(255, "Tên địa điểm du lịch tối đa 255 ký tự."),
      numbersofdays: yup
        .number(),
      cost: yup
        .number()
    });
    return {
      planLocal: { ...this.plan },
      planFormSchema,
    };
  },
  methods: {
    submitPlan() {
      this.$emit("submit:plan", this.planLocal);
    },
    deletePlan() {
      this.$emit("delete:plan", this.planLocal.id);
    },
  },
  
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
