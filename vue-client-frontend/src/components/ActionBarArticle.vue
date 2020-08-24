<template>
  <div class="action">
      <div>
          <a href="/publier">
            <img src="../images/edit.png" alt="Modifier">
          </a>
      </div>
      <div>
          <a href="/page_principale">
            <img src="../images/bin.png" alt="Supprimer">
          </a>
      </div>
     <div class="likes">
         <p class="mr-2 h4"> 5 </p>
         <img src="../images/like.jpg" alt="Liker">
     </div> 
  </div>
</template>

<script>
export default {
  name: 'ActionBar',
  props: {
      likesCount: {
          type: Number,
          required: true
      }
  }
}
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

