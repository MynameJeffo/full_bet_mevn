<template>
  <div class="memberInfoDetailsModal">
    <center>
      <h2>
        Create member info
      </h2>
    </center>
    <br />
    <b-form
      class="memberInfoDetailsInputForm"
      @submit="onSubmit"
      @reset="onReset"
      v-if="show"
    >
      <b-form-group
        id="input-group-1"
        class="col-10 col-sm-8"
        label="Club Name:"
        label-for="input-1"
        description="Club Name"
      >
        <b-form-input
          id="input-1"
          v-model="form.clubName"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        class="col-10 col-sm-8"
        label="Club ID:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.clubId"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <div class="submit-buttons float-right">
        <b-button type="submit" variant="primary">Confirm Edit</b-button>
        &nbsp;
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ user }}</pre>  two way binding
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
</style>
<script>
export default {
  data() {
    return {
      form: {
        clubName: "",
        clubId: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
      console.log(evt);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.clubName = "";
      this.form.clubId = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
