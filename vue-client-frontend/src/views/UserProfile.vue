<template>
    <div class="user-profile">
        <LargerCurrentUser class="mb-5" />

        <div class="text-center mb-5">
            <a href="/publier">
            <BaseButton> Créer un article </BaseButton>
        </a>
        </div>

        <div class="m-3">
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
    },
    created() {
        this.retrieveOneUser();
    }
}
</script>

<style lang="scss">
    .user-profile{
        .info-title{
            font-weight: bold;
        }
    }
</style>