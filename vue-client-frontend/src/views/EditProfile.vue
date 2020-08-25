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
                    :placeholder="Users.userName"
                />
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input
                    type="text"
                    class="form-control"
                    id="email"
                    required
                    :placeholder="Users.email"
                />
            </div>

            <div class="form-group">
                <label for="department">Equipe:</label>
                <input
                    type="text"
                    class="form-control"
                    id="department"
                    required
                    :placeholder="Users.department"
                />
            </div>

            <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    required
                    placeholder="******"
                />
            </div>

            <div class="text-center">
                <BaseButton class="mx-5 my-3"> Choisissez Votre Image </BaseButton>
                <a href="/profile">
                    <BaseButton class="mx-5 my-3"> Enregistrer Votre Profile </BaseButton>
                </a>
                <a href="/connection">
                    <BaseButton class="mx-5 my-3 mb-5"> Supprimer Votre Compte </BaseButton>
                </a>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
import BaseButton from "../components/BaseButton"
import Footer from "../components/Footer"

import {mapState} from "vuex"

export default {
  name: "editProfile",
  components: {
    BaseButton,
    Footer
  },
  computed:{
      ...mapState({
          Users: "Users"
      })
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
