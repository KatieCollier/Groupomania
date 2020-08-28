<template>
    <div class="currentUser">
        <p class="h4 mt-3"> {{user.userName}} </p>
        <img src="/images/profile.png" alt="lien vers la page de profile">
    </div>
</template>

<script>
import http from "../http-common"

export default {
  name: 'CurrentUser',
  data() {
      return {
          currentUser: "Harry Potter",
          src: "../images/profile.png",
          user:[]
      }
  },
   methods: {
      retrieveOneUser() {
          http
            .get("/users/" + localStorage.getItem("userId"))
            .then(response => {
                this.user = response.data
                console.log("User: ", response.data)
            })
            .catch(e => {
                console.log(e)
            })
      }
  },
  mounted() {
      this.retrieveOneUser();
  }
}
</script>

<style lang="scss">
    .currentUser{
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        img{
            border-radius: 50%;
        }
    }
</style>