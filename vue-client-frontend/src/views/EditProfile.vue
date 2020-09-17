<!-- view to edit user profile information and or picture-->
<template>
    <div class="edit-profile">

        <!-- user name input box-->
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

            <!-- email input box -->
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

            <!-- department input box -->
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

            <!-- password imput box -->
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

            <!-- image upload input -->
            <div class="form-group buttons">
                <label for="file"> Choisissez une image: </label>
                <input type="file" name="uploadfile" @change="uploadFile">
            </div>
        </div>
    
        <div>
            <BaseButton @click="updateProfile" class="mx-auto my-3 row"> Enregistrer Votre Profile </BaseButton>
            <BaseButton @click="deleteProfile" class="mx-auto my-3 mb-5 row"> Supprimer Votre Compte </BaseButton>
        </div>
        
        <Footer />
    </div>
</template>

<script>
//import components used in view
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
  data() {
      return {
          uploadfile: null
      }
  },
  props: ["user"],
  methods: {
      retrieveOneUser() { //get information about current user
            http
             .get("/users/" + this.$route.params.id)
             .then(response => {
                 this.user = response.data
             })
             .catch(err => {
                 console.log(err)
             })
        },
        uploadFile (event) { //define file to upload when it is selected or changed
            this.uploadfile = event.target.files
        },
      updateProfile() { //update profile
          if(this.uploadfile){ //if there is an image associated
              const formData = new FormData(); //create a formData object
            for (const i of Object.keys(this.uploadfile)) {
                formData.append('uploadfile', this.uploadfile[i])
            }
            formData.append("userName", this.user.userName)
            formData.append("email", this.user.email)
            formData.append("department", this.user.department)
            formData.append("password", this.user.password)

          http //and put it to the database
            .put("/users/" + this.$route.params.id, formData)
            .then(() => {
                router.push("/profile/" + this.$route.params.id)
            })
            .catch(err => {
                console.log(err)
            })
          } else { // if there is no image attached
             const data = { //create a data object
                 userName: this.user.userName,
                 email: this.user.email,
                 department: this.user.department,
                 password: this.user.password
             }

          http //and put it to the database
            .put("/users/" + this.$route.params.id, data)
            .then(() => {
                router.push("/profile/" + this.$route.params.id)
            })
            .catch(err => {
                console.log(err)
            })
          } 
      },
      deleteProfile() { //delete profile
          http
            .delete("/users/" + this.$route.params.id) //delete user
            .then(() => {
                localStorage.clear() //clear local stotage of userId and authorization token
                router.push("/connection") //return to the log in page
            })
      }
  },
  created() { //call the needed functions when the view is created
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
