<template>
    <input @keyup.enter="getSearchResults" v-model="keyword" type="text" placeholder="Rechercher dans le titre..." id="search" class="ml-3">
</template>

<script>
import router from "../router"

export default {
  name: 'SearchBar',
  data(){
      return {
          keyword: ""
      }
  },
  methods: {
      getSearchResults() {
          localStorage.setItem("keyword", this.keyword)
          const keywords = this.keyword.split(" ")
          if(keywords.length > 1) {
              alert("Vous ne pouvez entrer qu'un seul mot dans la recherche")
          } else {
              router.push("/resultats_recherche")
          }
      }
  }
}
</script>

<style lang="scss">
    #search{
        background-color: #C4C4C4;
        color: black;
        border: none;
        width: 70%;
    }
</style>