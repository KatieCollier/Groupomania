<template>
    <div class="currentUser">
        <p class="h4 mt-3"> {{currentUser}} </p>
        <img src="../images/profile.png" alt="lien vers la page de profile">
    </div>
</template>

<script>
export default {
  name: 'CurrentUser',
  data() {
      return {
          currentUser: "Harry Potter",
          src: "../images/profile.png"
      }
  }
}
</script>

<style lang="scss">
    .currentUser{
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        img{
            border-radius: 50%;
        }
    }
</style>