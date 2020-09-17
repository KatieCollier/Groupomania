<!-- Component for footer of views with signout button -->
<template>
    <footer class="text-center pt-2">
        <p @click="signOut"> Se Déconnecter </p>
    </footer>
</template>

<script>
import router from "../router"

export default {
    name: "Footer",
    methods: {
      signOut() { //signout function
        localStorage.clear(); //clears the local storage of its userId and authorization token
        router.push("/"); //sends the user back to the sing in page
      }
    }
}
</script>

<style lang="scss">
@import "../_variables.scss";

    footer{
        background-color: $pink;
        height: 40px;
    }
</style>