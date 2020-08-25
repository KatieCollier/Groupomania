<template>
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
          class="form-control"
          id="password"
          required
          v-model="user.password"
          name="password"
        />
      </div>

      <div class="text-center">
        <a href="/page_principale">
          <BaseButton @click="saveUser" class="m-3"> Connection </BaseButton>
        </a>

        <div class="mt-4">      
          <p> Pas encore de compte? <br>
          Inscrivez-vous! </p>
        </div>

        <a href="/inscription">
          <BaseButton @click="saveUser" class="m-3"> Inscription </BaseButton>
        </a>
      </div>

  </div>
</template>

<script>
import BaseButton from "../components/BaseButton"
import UserDataService from "../services/UserDataServices";

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
    findUser() {
      var data = {
        email: this.user.email,
        password: this.user.password,
      };

      UserDataService.getAll(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    
  }
};
</script>

<style lang="scss">
  .submit-form{
    max-width: 300px;
    margin: auto;
  }
  .form-control{
    border-radius: 5px;
    background-color: #FFD7D7;
    border: #FD2D01 1px solid;
  }
</style>