<!-- search bar to find articles by one word in their title -->
<template>
    <div>   
        <label for="search" class="ml-3"> Rechercher: </label>
        <input @keyup.enter="getSearchResults" v-model="keyword" type="text" placeholder="Rechercher dans le titre..." id="search" class="ml-3">
    </div>
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
      getSearchResults() { //function to save keyword
          localStorage.setItem("keyword", this.keyword); //store keyword in local storage
          const keywords = this.keyword.split(" "); //get the number of words entered in the search bar
          if(keywords.length > 1) { //if there are more than one word, send an alert to the user
              alert("Vous ne pouvez entrer qu'un seul mot dans la recherche")
          } else { //if there is only one word, go to the results page
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