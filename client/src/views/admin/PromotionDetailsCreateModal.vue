<template>
  <div class="memberInfoDetailsCreateModal">
    <b-form
      class="memberInfoDetailsInputForm"
      @submit="onSubmit"
      @reset="onReset"
      v-if="show"
    >
      <b-form-group
        id="input-group-1"
        class="col-10 col-sm-8"
        label="Promotion Image:"
        label-for="input-1"
      >
        <div
          class="imagePreviewWrapper"
          :style="{ 'background-image': `url(${promotionImage})` }"
          @click="selectImage"
        >
          <span v-if="!promotionImage" class="placeholder">
            Choose an Image
          </span>
          <input
            class="file-input"
            ref="fileInput"
            type="file"
            @input="pickFile"
          />
        </div>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        class="col-10 col-sm-8"
        label="Promotion Text:"
        label-for="promotionTextId"
      >
        <b-form-input
          id="promotionTextId"
          v-model="form.promotionText"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <!-- <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->
      <div class="submit-buttons float-right">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>  two way binding
    </b-card> -->
  </div>
</template>
<style scoped>
.memberInfoDetailsInputForm {
  text-align: center;
}

#input-group-1 {
  margin-left: auto;
  margin-right: auto;
}

#input-group-2 {
  margin-left: auto;
  margin-right: auto;
}

.submit-buttons {
  margin: 0 10px 10px 0;
}

.imagePreviewWrapper {
  display: block;
  width: 300px;
  height: 300px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}

.file-input {
  display: none;
}
</style>
<script>
export default {
  name: "PromotionDetailsCreateModal",
  props: ["promotionText", "promotionImage"],
  data() {
    return {
      form: {
        // promotionImage: this.$props.promotionImage,
        promotionText: this.$props.promotionText,
        promotionImage: this.$props.promotionImage
      },
      show: true
    };
  },
  created() {
    console.log("props-> ", this.$props);
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          console.log("file event ->", e);
          this.$props.promotionImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.$props.promotionText = "";
      this.$props.promotionImage = null;

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
