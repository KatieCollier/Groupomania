<!-- Vien to log into the application -->
<template>
  <div class="logon-form">
    <div class="submit-form">

        <!-- input box for email -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            class="form-control"
            id="email"
            required
            v-model="user.email"
            name="email"
          />
        </div>

        <!-- input box for password -->
        <div class="form-group">
          <label for="password"> Mot de passe: </label>
          <input
            type="password"
            class="form-control"
            id="password"
            required
            v-model="user.password"
            name="password"
          />
        </div>

        <!-- error message - displayed only if an error happend during the log in process -->
        <div class="error-alert text-center p-3" v-if="message">
          <p> Erreur lors de la connection: <br>
          {{this.message}} </p>
        </div>

        <div class="text-center">
            <BaseButton @click="login" class="m-3"> Connection </BaseButton>

          <div class="mt-4">      
            <p> Pas encore de compte? <br>
            Inscrivez-vous! </p>
          </div>

          <a href="/inscription">
            <BaseButton class="m-3"> Inscription </BaseButton>
          </a>
        </div>

    </div>
  </div>
</template>

<script>
//import components used in view
import BaseButton from "../components/BaseButton"

import http from "../http-common"

export default {
  name: "logon",
  components: {
    BaseButton
  },
  data() {
    return {
      user: [],
      message: null,
    };
  },
  methods: {
    login() { //login function
      const data = { //get data entered by the user
        email: this.user.email,
        password: this.user.password,
      };

      http
        .post("/users/login", data) // and post it to the database using the login path
        .then(response => {
          const userId = response.data.userId;
          const token = response.data.token;
          const chargeCom = response.data.chargeCom;
          localStorage.setItem("userId", userId); //store the user's ID - usefull to define them as the author of articles or comments
          localStorage.setItem("token", token); //store the authorization token, necessary to use the app
          localStorage.setItem("chargeCom", chargeCom); //store whether or not the user is in charcge of communication - if yes they get extra privileges
          window.location = "/page_principale"; //go to the main page
        })
        .catch(err => {
          console.log(err);
          this.message = err.response.data.error //in case of error, save its text as message
        });
    },
  }
};
</script>

<style lang="scss">
@import "../_variables.scss";

  .logon-form{
     .submit-form{
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