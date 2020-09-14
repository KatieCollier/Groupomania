<template>
    <div>
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

export default {
  name: 'CurrentUser',
  data() {
      return {
          user: [],
          userImage: "images/profile.png"
      }
  },
  methods: {
      retrieveOneUser() {
          http
            .get("/users/" + localStorage.getItem("userId"))
            .then(response => {
                this.user = response.data
                console.log("User: ", response.data)
                if(this.user.imageUrl != null) {
                    this.userImage = this.user.imageUrl
                }
                console.log("userImage", this.userImage)
            })
            .catch(e => {
                console.log(e)
            })
      }
  },
  created() {
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