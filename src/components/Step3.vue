<template>
  <div class="question question__two">
    <h2>On approximately what date did your lockdown begin?</h2>
    <label for="start-of-lockdown" class="sr-only">Choose a date</label>
    <b-input
      id="start-of-lockdown"
      v-model="startDateOfLockdown"
      v-on:keyup.enter="checkAndEmitLockdown()"
      :max="max"
      min="2019-12-31"
      placeholder="MM/DD/YYYY"
      type="date"
      ref="startDateOfLockdown"
      class="mb-2"
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
        <b-button variant="outline-secondary" v-on:click="checkAndEmitLockdown()">
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
  name: "Step3",
  props: {
    today: String,
    dateOfBirth: String
  },
  data() {
    return {
      startDateOfLockdown: "03/13/2020",
      max: this.today,
      isError: false,
      errorMessage: ""
    };
  },
  methods: {
    checkAndEmitLockdown: function() {
      if (!moment(this.startDateOfLockdown, "YYYY-MM-DD").isValid()) {
        this.triggerError("Please enter a valid date.");
        return;
      }
      if (moment(this.startDateOfLockdown, "YYYY-MM-DD").isAfter(moment())) {
        this.triggerError("Please enter a date in the past.");
        return;
      }
      if (
        moment(this.startDateOfLockdown, "YYYY-MM-DD").isBefore(
          this.dateOfBirth,
          "YYYY-MM-DD"
        )
      ) {
        this.triggerError("You weren't even born yet!");
        return;
      }
      if (
        moment(this.startDateOfLockdown, "YYYY-MM-DD").isBefore(
          "2019-12-31",
          "YYYY-MM-DD"
        )
      ) {
        this.triggerError(
          "Silly, that date is before the first reported case!"
        );
        return;
      }
      this.isError = false;
      this.error = "";
      this.$emit("next-step", this.startDateOfLockdown);
    },
    triggerError: function(errorMessage) {
      this.isError = true;
      this.errorMessage = errorMessage;
      this.$refs.startDateOfLockdown.$el.focus();
    }
  }
};
</script>
