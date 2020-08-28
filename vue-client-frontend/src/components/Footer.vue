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
      signOut() {
        localStorage.clear();
        router.push("/")
      }
    }
}
</script>

<style lang="scss">
    footer{
        background-color: #FFD7D7;
        height: 40px;
    }
</style>