<template>
  <div class="logon-form">
    <div class="submit-form">

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
import BaseButton from "../components/BaseButton"

import http from "../http-common"
import router from "../router"

export default {
  name: "logon",
  components: {
    BaseButton
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      }
    };
  },
  methods: {
    login() {
      const data = {
        email: this.user.email,
        password: this.user.password,
      };

      http
        .post("/users/login", data)
        .then(response => {
          const userId = response.data.userId;
          const token = response.data.token;
          const chargeCom = response.data.chargeCom
          localStorage.setItem("userId", userId);
          localStorage.setItem("token", token);
          localStorage.setItem("chargeCom", chargeCom);
          router.push("/page_principale");
        })
        .catch(e => {
          console.log(e)
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
  }
</style>