<template>
  <div class="submit-form">
    
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

      <p> *: Champ obligatoire </p>
      <div class="text-center">
        <BaseButton @click="saveUser"> Inscription </BaseButton>
      </div>
    
  </div>
    
</template>

<script>
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
      user: {
        email: "",
        userName: "",
        password: "",
        department: "",
        chargeCom: false
      }
    };
  },
  methods: {
    saveUser() {
      const data = {
        email: this.user.email,
        userName: this.user.userName,
        password: this.user.password,
        department: this.user.department,
        chargeCom: false
      };

      http
        .post("/users/signup", data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
          router.push("/");
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newUser() {
      this.submitted = false;
      this.user = {};
    }
  }
};
</script>

<style  lang="scss">
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  .form-control{
      border-radius: 5px;
      background-color: #FFD7D7;
      border: #FD2D01 1px solid;
    }
</style>
