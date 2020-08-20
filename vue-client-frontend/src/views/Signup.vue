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
          class="form-control"
          id="password"
          required
          v-model="user.password"
          name="password"
        />
      </div>

      <p> *: Champ obligatoire </p>
      <div class="text-center">
        <a href="/page_principale">
          <BaseButton @click="saveUser"> Inscription </BaseButton>
        </a>
      </div>
    
  </div>
    
</template>

<script>
import BaseButton from "../components/BaseButton"
import UserDataService from "../services/UserDataServices";

export default {
  name: "signup",
  components: {
    BaseButton
  },
  data() {
    return {
      user: {
        id: null,
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
      var data = {
        email: this.user.email,
        userName: this.user.userName,
        password: this.user.password,
        department: this.user.department
      };

      UserDataService.create(data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
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

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
