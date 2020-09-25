<!-- component to display the name and profile picture of the current user (the one that is logged in) -->
<template>
    <div>
        <!-- link to profile page on name and image -->
        <router-link :to="{
                            name: 'profilePage',
                            params: { id: user.id }
                        }">
            <div class="currentUser col-7 offset-5 mb-3">
                <p class="pr-2 h5 font-weight-bold"> {{user.userName}} </p>
                <img :src="userImage" alt="lien vers la page de profile">
            </div>
        </router-link>
    </div>
</template>

<script>
import http from "../http-common"
import jwtDecode from "jwt-decode"

export default {
  name: 'CurrentUser',
  data() {
      return {
          user: [],
          userImage: "/images/profile.png" //default profile pic
      }
  },
  methods: {
      retrieveOneUser() { //function to retrieve user information
        const decoded = jwtDecode(localStorage.getItem("token"))
        const userId = decoded.userId

          http
            .get("/users/" + userId) // get user info using the id stored during login
            .then(response => {
                this.user = response.data
                if(this.user.imageUrl != null) { //if there is a custom profile pic, use that one instead of the default one
                    this.userImage = this.user.imageUrl
                }
            })
            .catch(err => {
                console.log(err)
            })
      }
  },
  created() { //call necessary function when view is created
      this.retrieveOneUser();
  }
}
</script>

<style lang="scss">
    .currentUser{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        img{
            border-radius: 50%;
        }
    }
</style>