<!-- view of the user's profile -->
<template>
    <div class="user-profile">
        <LargerCurrentUser class="mb-5" />

        <div class="text-center mb-5">
            <a href="/publier">
            <BaseButton> Créer un article </BaseButton>
        </a>
        </div>
        
        <div class="offset-1 offset-sm-3 p-3 user-info">
            <p class="info-title h4"> Informations utilisateur: </p>
            <div class="m-3">
                <p> <strong> Nom d'utilisateur: </strong> {{this.user.userName}} </p>
                <p> <strong> Email: </strong> {{this.user.email}} </p>
                <p> <strong> Equipe: </strong> {{this.user.department}} </p>
            </div>
        </div>

        <div class="text-center m-5"> 
            <router-link :to="{
                            name: 'editProfile',
                            params: { id: this.user.id }
                        }">
                <BaseButton> Modifier Profile </BaseButton>
            </router-link>

            <a href="/page_principale">
                <ReturnButton class="my-5" />
            </a>
        </div>

        <Footer />
        
    </div>
</template>

<script>
//import components for view
import LargerCurrentUser from "../components/LargeCurrentUser"
import BaseButton from "../components/BaseButton"
import ReturnButton from "../components/ReturnButton"
import Footer from "../components/Footer"

import http from "../http-common"

export default {
    name: "profilePage",
    components: {
        LargerCurrentUser,
        BaseButton,
        ReturnButton,
        Footer
    },
    props: ["user"],
    methods: {
        retrieveOneUser() { // get user info
            http
             .get("/users/" + this.$route.params.id)
             .then(response => {
                 this.user = response.data
             })
             .catch(err => {
                 console.log(err)
             })
        },
    },
    created() { //call necessary functions when view is created
        this.retrieveOneUser();
    }
}
</script>

<style lang="scss">
@import "../_variables.scss";

    .user-profile{
        .user-info{
            border-left: black solid 2px;
        }
        .info-title{
            font-weight: bold;
        }
        button:hover{
          background-color: $red;
          color: white;
        }
    }
</style>