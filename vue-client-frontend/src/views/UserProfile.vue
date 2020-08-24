<template>
    <div>
        <LargerCurrentUser class="mb-5" />

        <div class="text-center mb-5">
            <a href="/publier">
            <BaseButton> Créer un article </BaseButton>
        </a>
        </div>

        <div class="m-3">
            <p class="info-title h4"> Informations utilisateur: </p>
            <div class="m-3">
                <p> <strong> Nom d'utilisateur: </strong> {{Users.userName}} </p>
                <p> <strong> Email: </strong> {{Users.email}} </p>
                <p> <strong> Equipe: </strong> {{Users.department}} </p>
            </div>
        </div>

        <div class="text-center m-5"> 
            <a href="/modifier_profile">
                <BaseButton> Modifier Profile </BaseButton>
            </a>
        </div>
        
    </div>
</template>

<script>
import LargerCurrentUser from "../components/LargeCurrentUser"
import BaseButton from "../components/BaseButton"

import {mapState} from "vuex"

export default {
    name: "profilePage",
    components: {
        LargerCurrentUser,
        BaseButton
    },
    computed: {
        ...mapState({
            Users: "Users",
        })
    }
}
</script>

<style lang="scss">
    .info-title{
        font-weight: bold;
    }
</style>