<template>
  <Form
    @submit="submitTouristAttraction"
    :validation-schema="touristAttractionFormSchema"
  >
    <div class="form-group">
      <label for="name">Tên điểm du lịch</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="touristAttractionLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field
        name="address"
        type="text"
        class="form-control"
        v-model="touristAttractionLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="describe">Giới thiệu</label>
      <Field
        name="describe"
        type="text"
        class="form-control"
        v-model="touristAttractionLocal.describe"
      />
      <ErrorMessage name="describe" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="fare">Giá tham quan</label>
      <Field
        name="fare"
        type="number"
        class="form-control"
        v-model="touristAttractionLocal.fare"
      />
      <ErrorMessage name="fare" class="error-feedback" />
    </div>
    <div class="form-group form-check">
      <input
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="touristAttractionLocal.favorite"
      />
      <label for="favorite" class="form-check-label">
        <strong>Điểm du lịch yêu thích</strong>
      </label>
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="touristAttractionLocal.id"
        type="button"
        class="ml-5 btn btn-danger"
        @click="deleteTouristAttraction"
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
  emits: ["submit:touristAttraction", "delete:touristAttraction"],
  props: {
    touristAttraction: { type: Object, required: true },
  },
  data() {
    const touristAttractionFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      address: yup.string().max(1000, "Địa chỉ tối đa 1000 ký tự."),
      describe: yup
        .string(),
      fare: yup
        .number()
    });
    return {
      touristAttractionLocal: { ...this.touristAttraction, favorite: !!this.touristAttraction.favorite },
      touristAttractionFormSchema,
    };
  },
  methods: {
    submitTouristAttraction() {
      this.$emit("submit:touristAttraction", this.touristAttractionLocal);
    },
    deleteTouristAttraction() {
      this.$emit("delete:touristAttraction", this.touristAttractionLocal.id);
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
