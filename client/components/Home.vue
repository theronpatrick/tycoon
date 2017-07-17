<template>
  <div class="page">
    <button @click="loginClick">Log In</button>
    <button @click="getUser">Get User</button>

    <div>
      <img v-for="image in images" :src="image.images.standard_resolution.url"></img>
    </div>

  </div>
</template>

<script>

import Instafeed from "instafeed.js"
import $ from "jquery"

export default {
  components: {

  },
  data: function() {
    return {
      token: "",
      id: "",
      images: []
    }
  },
  mounted: function() {

    window.instaCallback = this.instaCallback

    let route = this.$route.path
    let tokenArray = route.split("access_token")
    let token = ""
    if (tokenArray.length > 1) {
      token = tokenArray[1].replace("=", "")
    }

    if (token) {

      this.token = token

      this.getUser()

    }


  },
  methods: {
    instaCallback: function(d) {
      console.log("callback data " , d);
      this.id = d.data.id
      this.runFeed()
    },
    runFeed: function() {
      var feed = new Instafeed({
        get: 'user',
        userId: this.id,
        accessToken: this.token,
        mock: true,
        success: (d) => {
          console.log("feed data " , d);
          this.images = d.data
          this.buildImages()
        }
      });
      feed.run();
    },
    buildImages: function() {
      // TODO: Remove if not using
    },
    getUser: function() {

      $.ajax({
        type: "GET",
        url: "https://api.instagram.com/v1/users/self",
        data: {
          access_token: this.token,
          callback: "instaCallback"
        },
        dataType: "jsonp"
      })
      .done((r) => {
          console.log("response " , r);
      })
      .fail((e) => {
        console.log("didn't really fail, jquery just dumb");
      })


    },
    loginClick: function() {
      let link = "https://api.instagram.com/oauth/authorize/?client_id=545cb374b1d34cd0adb04853177bc8d5&redirect_uri=http://localhost:4000&response_type=token"
      window.open(link, "_self")
    }
  }
}
</script>

<style scoped>
  img {
    width: 10%;
    height: 10%;
    display: inline-block;
  }
</style>
