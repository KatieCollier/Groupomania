<template>
    <div class="edit-profile">

        <div class="m-4">
            <div class="form-group">
                <label for="userName">Nom d'utilisateur:</label>
                <input
                    class="form-control"
                    type="text"
                    id="userName"
                    required
                    v-model="user.userName"
                    name="userName"
                />
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input
                    class="form-control"
                    type="text"
                    id="email"
                    required
                    v-model="user.email"
                    name="email"
                />
            </div>

            <div class="form-group">
                <label for="department">Equipe:</label>
                <input
                    class="form-control"
                    type="text"
                    id="department"
                    required
                    v-model="user.department"
                    name="department"
                />
            </div>

            <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input
                    class="form-control"
                    type="password"
                    id="password"
                    required
                    name="password"
                    placeholder="Changez votre mot de passe"
                />
            </div>
        </div>

        <UploadFiles />
    
        <div class="text-center m-5">
            <BaseButton @click="updateProfile" class="mx-5 my-3"> Enregistrer Votre Profile </BaseButton>
            <BaseButton @click="deleteProfile" class="mx-5 my-3 mb-5"> Supprimer Votre Compte </BaseButton>
        </div>
        
        <Footer />
    </div>
</template>

<script>
import BaseButton from "../components/BaseButton"
import UploadFiles from "../components/UploadFiles"
import Footer from "../components/Footer"

import http from "../http-common"
import router from "../router"

export default {
  name: "editProfile",
  components: {
    BaseButton,
    UploadFiles,
    Footer
  },
  data() {
      return {
          image: null
      }
  },
  props: ["user"],
  methods: {
      retrieveOneUser() {
            http
             .get("/users/" + this.$route.params.id)
             .then(response => {
                 this.user = response.data
             })
             .catch(e => {
                 console.log(e)
             })
        },
      updateProfile() {
          if(localStorage.getItem("imageUrl")) {
              this.image = localStorage.getItem("imageUrl")
          } else {
              this.image = this.user.imageUrl
          }

        const data = {
            userName: this.user.userName,
            email: this.user.email,
            department: this.user.department,
            password: this.user.password,
            imageUrl: this.image
        }

          http
            .put("/users/" + this.$route.params.id, data)
            .then(response => {
                console.log(response.data)
                localStorage.removeItem("imageUrl")
                router.push("/profile/" + this.$route.params.id)
            })
            .catch(e => {
                console.log(e)
            })
      },
      deleteProfile() {
          http
            .delete("/users/" + this.$route.params.id)
            .then(response => {
                console.log(response.data)
                localStorage.clear()
                router.push("/connection")
            })
      }
  },
  created() {
      this.retrieveOneUser();
  }
};
</script>

<style lang="scss">
@import "../_variables.scss";

    .edit-profile{
        input{
            border-radius: 5px;
            background-color: $pink;
            border: $red 1px solid;
            box-shadow: none;
            width: 100%;
        }
        button:hover{
          background-color: $red;
          color: white;
        }
    }
</style>
