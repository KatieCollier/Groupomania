<template>
    <div class="currentUser col-7 offset-5 mb-3">
        <p class="pr-2 h5"> {{Users.userName}} </p>
        <a href="/profile" class="stretched-link">
            <img :src="Users.image" alt="lien vers la page de profile">
        </a>
    </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  name: 'CurrentUser',
  computed: {
      ...mapState({
          Users: "Users"
      })
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