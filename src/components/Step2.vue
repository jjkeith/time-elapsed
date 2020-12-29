<template>
  <div class="question question__one">
    <h2>What is your date of birth?</h2>
    <label for="date-of-birth" class="sr-only">Choose a date</label>
    <b-input
      id="date-of-birth"
      v-model="dateOfBirth"
      v-on:keyup.enter="checkAndEmitDOB()"
      :min="min"
      :max="max"
      type="date"
      class="mb-2"
      ref="dateOfBirth"
    ></b-input>
    <p v-show="isError" class="error">
      <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
      {{ errorMessage }}
    </p>
    <div class="row justify-content-between">
      <div class="col-auto">
        <b-button variant="outline-secondary" v-on:click="$emit('previous-step')">
          <b-icon icon="arrow-left" class="btn-icon"></b-icon>Back
        </b-button>
      </div>
      <div class="col-auto">
        <b-button variant="outline-secondary" v-on:click="checkAndEmitDOB()">
          Next
          <b-icon icon="arrow-right" class="btn-icon"></b-icon>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Step2",
  props: {
    today: String
  },
  data() {
    return {
      dateOfBirth: "",
      max: this.today,
      min: "01/01/1900",
      errorMessage: "",
      isError: false
    };
  },
  methods: {
    checkAndEmitDOB: function() {
      if (!moment(this.dateOfBirth, "YYYY-MM-DD").isValid()) {
        this.triggerError("Please enter a valid date.");
        return;
      }
      if (moment(this.dateOfBirth, "YYYY-MM-DD").isAfter(moment())) {
        this.triggerError("Please enter a date in the past.");
        return;
      }
      if (moment(this.dateOfBirth, "YYYY-MM-DD").isBefore("1900-01-01")) {
        this.triggerError("We all know that you're not that old.");
        return;
      }
      this.isError = false;
      this.error = "";
      this.$emit("next-step", this.dateOfBirth);
      return;
    },
    triggerError: function(errorMessage) {
      this.isError = true;
      this.errorMessage = errorMessage;
      this.$refs.dateOfBirth.$el.focus();
    }
  }
};
</script>
