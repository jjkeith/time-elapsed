<template>
  <div class="hello">
    <h2>Results</h2>
    <p>You have spent {{ results }}% of your life in lockdown.</p>
    <div class="row justify-content-between">
      <div class="col-6 col-sm-auto">
        <b-button variant="outline-secondary" v-on:click="showShareOptions = true">Share Results</b-button>
        <br>
        <transition name="fade">
          <b-button-group v-if="showShareOptions">
            <b-button
              variant="outline-secondary"
              v-on:click="shareWithEmail"
              id="email-share"
              class="share-btn"
            >
              <b-icon icon="envelope"></b-icon>
              <span class="sr-only">Opens Email client in a new window</span>
            </b-button>
            <b-button
              variant="outline-secondary d-sm-none"
              v-on:click="shareWithSMS"
              id="sms-share"
              class="share-btn d-md-none"
            >
              <b-icon icon="chat"></b-icon>
              <span class="sr-only">Opens SMS in a new window</span>
            </b-button>
            <b-button
              variant="outline-secondary"
              id="twitter-share"
              v-on:click="shareWithTwitter"
              class="share-btn"
            >
              <b-icon icon="twitter"></b-icon>
              <span class="sr-only">Opens Twitter in a new window</span>
            </b-button>
            <b-tooltip target="email-share" variant="secondary" title="Email"></b-tooltip>
            <b-tooltip target="sms-share" variant="secondary" title="SMS" class="tooltip"></b-tooltip>
            <b-tooltip target="twitter-share" variant="secondary" title="Twitter" class="tooltip"></b-tooltip>
          </b-button-group>
        </transition>
      </div>
      <div class="col-6 col-sm-auto">
        <b-button variant="outline-secondary" v-on:click="$emit('start-again')">Start Over</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step4",
  props: {
    results: Number
  },
  data() {
    return {
      showShareOptions: false,
      shareBody:
        this.results > 0
          ? encodeURIComponent(
              "I have spent " +
                this.results.toString() +
                "% of my life in lockdown. Calculate your own percentage WEBSITE TK"
            )
          : "Calculate what percentage of your life you have spent in lockdown at WEBSITE TK"
    };
  },
  methods: {
    shareWithEmail: function() {
      var subject = encodeURIComponent(
          "Guess what percentage of my life has been spent in lockdown"
        ),
        mailto =
          "mailto:" + "" + "?subject=" + subject + "&body=" + this.shareBody;

      window.top.location.href = mailto;
    },
    shareWithTwitter: function() {
      var href = "https://twitter.com/intent/tweet?text=" + this.shareBody;
      window.top.location.href = href;
    },
    shareWithSMS: function() {
      // TODO Test on a phone
      window.top.location.href = "sms:?&body=" + this.shareBody;
    }
  }
};
</script>
<a class="twitter-share-button"
  href="https://twitter.com/intent/tweet?text=Hello%20world"
  data-size="large">
Tweet</a>
