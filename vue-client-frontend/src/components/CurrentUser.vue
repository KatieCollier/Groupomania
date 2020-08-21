<template>
    <div class="currentUser col-7 offset-5 mb-3">
        <p class="pr-2 h5"> {{currentUser}} </p>
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
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        img{
            border-radius: 50%;
        }
    }
</style>