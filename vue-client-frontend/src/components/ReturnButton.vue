<template>
  <div>
      <a href="page_principale">
          <button v-on="$listeners" class="return-button btn-md m-3">
              Retour à l'accueil
          </button>
      </a>
  </div>
  
</template>

<script>
export default {
  name: 'ReturnButton'
}
</script>

<style lang="scss">
    .return-button{
        background-color: #FFD7D7;
        border: 2px solid black;
        border-radius: 10px;
        color: black;
    }
</style>
