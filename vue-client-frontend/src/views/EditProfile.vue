<template>
    <div>
        <div class="submit-form">
            <div class="form-group">
                <label for="userName">Nom d'utilisateur:</label>
                <input
                    type="text"
                    class="form-control"
                    id="userName"
                    required
                    v-model="user.userName"
                    name="userName"
                />
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input
                    type="text"
                    class="form-control"
                    id="email"
                    required
                    v-model="user.email"
                    name="email"
                />
            </div>

            <div class="form-group">
                <label for="department">Equipe:</label>
                <input
                    type="text"
                    class="form-control"
                    id="department"
                    required
                    v-model="user.department"
                    name="department"
                />
            </div>

            <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    required
                    name="password"
                    placeholder="Changez votre mot de passe"
                />
            </div>

            <div class="text-center">
                <BaseButton class="mx-5 my-3"> Choisissez Votre Image </BaseButton>
                <BaseButton @click="updateProfile" class="mx-5 my-3"> Enregistrer Votre Profile </BaseButton>
                <BaseButton @click="deleteProfile" class="mx-5 my-3 mb-5"> Supprimer Votre Compte </BaseButton>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
import BaseButton from "../components/BaseButton"
import Footer from "../components/Footer"

import http from "../http-common"
import router from "../router"

export default {
  name: "editProfile",
  components: {
    BaseButton,
    Footer
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
        const data = {
            userName: this.user.userName,
            email: this.user.email,
            department: this.user.department,
            password: this.user.password
        }

          http
            .put("/users/" + this.$route.params.id, data)
            .then(response => {
                console.log(response.data)
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

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
