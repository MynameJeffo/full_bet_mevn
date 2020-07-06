<template>
  <div class="memberInfoDetailsModal">
    <center>
      <h2>
        Edit member info
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
        id="input-group-username"
        class="col-10 col-sm-8 input-groups"
        label-cols="5"
        label="User Name:"
        label-for="input-username"
      >
        <b-form-input
          id="input-username"
          v-model="id"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-email"
        class="col-10 col-sm-8 input-groups"
        label-cols="5"
        label="Email:"
        label-for="input-email"
      >
        <b-form-input
          id="input-email"
          v-model="email"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-password"
        class="col-10 col-sm-8 input-groups"
        label-cols="5"
        label="Password:"
        label-for="input-password"
      >
        <b-form-input
          id="input-password"
          v-model="password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-clubName"
        class="col-10 col-sm-8 input-groups"
        label-cols="5"
        label="Club Name:"
        label-for="input-clubName"
      >
        <b-form-input
          id="input-clubName"
          class="mb-2 mr-sm-2 mb-sm-0 input-clubInfo"
          v-model="clubName"
          required
          placeholder="Enter Club Name"
        ></b-form-input>
        
      </b-form-group>

      <b-form-group
        id="input-group-clubId"
        class="col-10 col-sm-8 input-groups"
        label-cols="5"
        label="Club ID:"
        label-for="input-clubId"
      >
        <b-form-input
          id="input-clubId"
          class="mb-2 mr-sm-2 mb-sm-0 input-clubInfo"
          v-model="form.clubId"
          required
          placeholder="Enter Club ID"
        ></b-form-input>
      </b-form-group>
      <br />
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

#input-group-clubName {
  margin: 0 auto;
  padding: 3px 0;
  border-top: 2px dotted #000;
  border-bottom: 2px dotted #000;
}

.input-groups {
  margin-left: auto;
  margin-right: auto;
}

#input-clubName {
  margin-left: auto;
  margin-right: auto;
}

#input-clubId {
  margin-left: auto;
  margin-right: auto;
}

.submit-buttons {
  margin: 0 10px 10px 0;
}
</style>
<script>
export default {
  name: "MemberInfoDetailsEditModal",
  props: ["id", "email", "username", "password", "clubInfo"],
  data() {
    return {
      form: {
        id: this.id,
        username: this.email,
        password: this.username,
        clubInfo: this.clubInfo
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
