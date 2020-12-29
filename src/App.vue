<template>
  <div id="app" class="row justify-content-center">
    <div class="col-10 col-md-6">
      <Step1 v-show="stepToShow == 1" v-on:next-step="stepToShow ++"/>
      <transition name="fade">
        <Step2
          v-show="stepToShow == 2"
          v-on:next-step="dateOfBirth = $event; stepToShow ++"
          v-on:previous-step="stepToShow --"
          v-bind:today="dateOfToday"
          v-bind:dateOfBirth="dateOfBirth"
        />
      </transition>
      <transition name="fade">
        <Step3
          v-show="stepToShow == 3"
          v-on:next-step="startDateOfLockdown = $event; stepToShow ++"
          v-on:previous-step="stepToShow --"
          v-bind:today="dateOfToday"
          v-bind:dateOfBirth="dateOfBirth"
        />
      </transition>
      <transition name="fade">
        <Step4
          v-show="stepToShow == 4"
          v-on:start-again="startAgain()"
          v-bind:results="percentageOfLifeInLockdown"
        />
      </transition>
      <footer class="footer mt-5">
        <p class="footer-attribution my-0 d-inline-block">
          Created by
          <a href="http://hiyajj.com" target="_blank">JJ Keith</a>
        </p>
        <ul class="m-0 footer-nav nav d-inline-block">
          <li class="d-inline-block">
            &nbsp;
            <a href="https://github.com/jjkeith" target="_blank">
              <b-icon icon="github" scale="0.85"></b-icon>
            </a>
          </li>
          <li class="d-inline-block">
            &nbsp;
            <a href="https://www.linkedin.com/in/jjkeith/" target="_blank">
              <b-icon icon="linkedin" scale="0.85"></b-icon>
            </a>
          </li>
        </ul>

        <p
          class="footer-text m-0"
        >Any information entered is not stored, transmitted, or otherwise utilized.</p>
        <p class="footer-attribution m-0">&copy; 2020 (obviously)</p>
      </footer>
    </div>
  </div>
</template>

<script>
import Step1 from "./components/Step1.vue";
import Step2 from "./components/Step2.vue";
import Step3 from "./components/Step3.vue";
import Step4 from "./components/Step4.vue";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "app",
  components: {
    Step1,
    Step2,
    Step3,
    Step4
  },
  data: function() {
    var dd = moment().date(),
      mm = moment().month() + 1,
      yyyy = moment().year();

    return {
      readyToStart: false,
      dateOfBirth: null,
      startDateOfLockdown: null,
      dateOfToday: yyyy + "-" + mm + "-" + dd,
      stepToShow: 1
    };
  },
  computed: {
    percentageOfLifeInLockdown: function() {
      if (this.dateOfBirth && this.startDateOfLockdown) {
        var dobMoment = moment(this.dateOfBirth, "YYYY-MM-DD"),
          lockdownMoment = moment(this.startDateOfLockdown, "YYYY-MM-DD"),
          daysSinceDOB = moment().diff(dobMoment, "days"),
          daysSinceLockdown = moment().diff(lockdownMoment, "days");

        return (
          // round to a percentage with two decimal places
          Math.round((daysSinceLockdown / daysSinceDOB) * 10000) / 100
        );
      }
      return null;
    }
  },
  methods: {
    startAgain: function() {
      // TODO the dates aren't clearing from the inputs
      this.dateOfBirth = null;
      this.startDateOfLockdown = null;
      this.stepToShow = 1;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Righteous&display=swap");

$primary: #bb4430;
$secondary: #306abb;
$body-color: #231f20;
$danger: #bb4430;
$background-color: #efe6dd;
$element-background: #ffffff;
$body-font: "Lato";
$header-font: "Righteous";

body {
  background-color: $background-color;
}
#app {
  font-family: $body-font, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $body-color;
  font-size: 1rem;
  height: 550px;
  margin-top: 60px;
  position: realtive;
  text-align-last: left;
  @media (min-width: 800px) {
    height: 400px;
  }
  h1 {
    color: $secondary;
    font-family: $header-font, Helvetica, Arial, sans-serif;
    font-size: 1.75rem;
    margin: 0 0 1rem;
  }
  h2 {
    color: $secondary;
    font-family: $header-font, Helvetica, Arial, sans-serif;
    font-size: 1.75rem;
    margin: 0 0 1rem;
  }
  .disclaimer,
  .footer-text,
  .footer-attribution {
    color: lighten($body-color, 20%);
    font-size: 0.75rem;
    margin-top: 3rem;
  }
  .error {
    color: $danger;
    height: 1rem;
    margin-bottom: -1rem;
  }
  .form-control {
    background-color: $element-background;
  }
  .btn.btn-outline-secondary {
    background-color: $element-background;
    border-color: $secondary;
    color: $secondary;
    font-family: $header-font, Helvetica, Arial, sans-serif;
    margin-top: 2rem;
    &:hover,
    &:active,
    &:focus {
      background-color: $secondary;
      color: $element-background;
      transform: 0.3s all ease-in-out;
    }
    .bi-arrow-left {
      margin: 0 0.25rem 0 0;
    }
    .bi-arrow-right {
      margin: 0.125rem 0 0 0.25rem;
    }
  }
  .btn-group {
    margin-top: 1rem;
  }
  .footer {
    position: absolute;
    bottom: 0;
  }
  .footer-nav a,
  .footer-attribution a {
    color: $body-color;
  }
  .footer-nav a:hover,
  .footer-attribution a:hover {
    color: $secondary;
    text-decoration: none;
  }
  .footer-nav a:hover svg {
    transform: scale(1.25);
    transition: 0.2s all ease-in-out;
  }
  // Transitions
  .fade-enter-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave {
    opacity: 0;
  }
}
.tooltip-inner {
  background-color: $secondary !important;
}
div.arrow::before {
  border-top-color: $secondary !important;
}
</style>
