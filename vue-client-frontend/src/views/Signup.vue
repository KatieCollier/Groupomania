<!-- view to allow a user to signup to the app-->
<template>
  <div class="signup-form">
    <div class="submit-form">

        <!-- user name input box -->
        <div class="form-group">
          <label for="userName">Nom d'utilisateur*:</label>
          <input
            type="text"
            class="form-control"
            id="userName"
            required
            v-model="user.userName"
            name="userName"
          />
        </div>

        <!-- email name input box -->
        <div class="form-group">
          <label for="email">Email*:</label>
          <input
            class="form-control"
            id="email"
            required
            v-model="user.email"
            name="email"
          />
        </div>

        <!-- department name input box -->
        <div class="form-group">
          <label for="department"> Equipe*: </label>
          <input
            class="form-control"
            id="department"
            required
            v-model="user.department"
            name="department"
          />
        </div>

        <!-- password name input box -->
        <div class="form-group">
          <label for="password"> Mot de passe*: </label>
          <input
            type="password"
            class="form-control"
            id="password"
            required
            v-model="user.password"
            name="password"
          />
        </div>

        <!-- error message - only displayed in case of an error -->
        <div class="error-alert text-center my-3 p-3" v-if="message">
          <p> Erreur lors de l'inscription: <br>
          {{this.message}} </p>
        </div>

        <p> *: Champ obligatoire </p>
        <div class="text-center">
          <BaseButton @click="saveUser"> Inscription </BaseButton>
        </div>
      
    </div>
  </div>   
</template>

<script>
//import components used in view
import BaseButton from "../components/BaseButton"

import router from "../router"
import http from "../http-common"

export default {
  name: "signup",
  components: {
    BaseButton
  },
  data() {
    return {
      user: [],
      message: null
    };
  },
  methods: {
    saveUser() { //sign in user
      const data = { //create data object with the user's information
        email: this.user.email,
        userName: this.user.userName,
        password: this.user.password,
        department: this.user.department,
        chargeCom: false
      };

      http //post it to the database with the signup path
        .post("/users/signup", data)
        .then(response => {
          this.user.id = response.data.id;
          router.push("/"); //go to login page
        })
        .catch(err => {
          console.log(err);
          this.message = err.response.data.error //in case of error, define message
        });
    }
  }
};
</script>

<style  lang="scss">
@import "../_variables.scss";

  .signup-form{
    .submit-form {
      max-width: 300px;
      margin: auto;
    }
    .form-control{
        border-radius: 5px;
        background-color: $pink;
        border: $red 1px solid;
    }
    .error-alert{
      color: black;
      font-weight: bold;
      border: $red solid 5px;
    }
  }
</style>
