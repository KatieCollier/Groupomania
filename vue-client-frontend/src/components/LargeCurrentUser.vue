<!-- component that displays the logged in user's name and profile pic in large -->
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
          userImage: "/images/profile.png" //default profile pic
      }
  },
   methods: {
      retrieveOneUser() { //function to get information on current user
          http
            .get("/users/" + localStorage.getItem("userId"))
            .then(response => {
                this.user = response.data
                if(this.user.imageUrl != null) { // if there is a custom profile pic, use this instead of the default one
                    this.userImage = this.user.imageUrl
                }
            })
            .catch(err => {
                console.log(err)
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