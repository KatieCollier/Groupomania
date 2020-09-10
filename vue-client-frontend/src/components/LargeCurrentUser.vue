<template>
    <div class="currentUser">
        <p class="h4 mt-3"> {{user.userName}} </p>
        <img :src="userImage" alt="lien vers la page de profile">
    </div>
</template>

<script>
import http from "../http-common"

export default {
  name: 'CurrentUser',
  data() {
      return {
          user:[],
          userImage: "/images/profile.png"
      }
  },
   methods: {
      retrieveOneUser() {
          http
            .get("/users/" + localStorage.getItem("userId"))
            .then(response => {
                this.user = response.data
                if(this.user.imageUrl != null) {
                    this.userImage = this.user.imageUrl
                }
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