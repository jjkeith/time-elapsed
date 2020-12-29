<template>
  <div class="question question__one">
    <h1>What percentage of your life have you spent in lockdown?</h1>
    <p>I apologize in advance for making you think about this.</p>
    <p>For the purposes of this exercise, we're assuming that your lockdown has been continuous and we're using the term "lockdown" very loosely. Basically, we're looking at the percentage of your life that has sucked because of COVID-19.</p>

    <div class="row justify-content-center">
      <div class="col-auto">
        <b-button variant="outline-secondary" v-on:click="emitStart">Begin</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step1",
  methods: {
    emitStart: function() {
      this.$emit("next-step");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
