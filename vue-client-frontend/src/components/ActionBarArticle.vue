<template>
  <div class="action">
      <div>
          <a href="/publier">
            <img src="/images/edit.png" alt="Modifier">
          </a>
      </div>
      <div>
          <span v-on:click="deleteArticle()">
            <img src="/images/bin.png" alt="Supprimer">
          </span>
      </div>
     <div class="likes">
         <p class="mr-2 h4"> 5 </p>
         <img src="/images/like.jpg" alt="Liker">
     </div> 
  </div>
</template>

<script>
import http from '../http-common'


export default {
  name: 'ActionBar',
  methods: {
      deleteArticle() {
          http
            .delete("/articles/" + this.article.id)
            .then(response => {
                console.log(response.data);
                this.$emit("refreshData");
                this.$router.push("/page_principale");
            })
            .catch(e => {
                console.log(e);
            });
      }
  }
};
</script>

<style lang="scss">
    .action{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .likes{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        p{
            font-weight: bold;
            color: #FD2D01;
        }
    }
</style>

