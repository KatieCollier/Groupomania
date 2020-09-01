<template>
    <div class="comment m-3 p-2">
        <p class="commentor mb-0"> {{commentor}} </p>
        <p> {{createdAt}} </p>
        <p> {{content}} </p>

        <div class="action">
            <div v-if="canEditComment">
                <router-link :to="{
                            name: 'editComment',
                            params: { id: commentId }
                        }">
                    <img src="/images/edit.png" alt="Modifier">
                </router-link>
            </div>
            <div v-if="canEditComment">
                <img src="/images/bin.png" alt="Supprimer">
            </div>
            <div class="likes">
                <p class="mr-2 h4"> 5 </p>
                <img src="/images/like.jpg" alt="Liker">
            </div> 
        </div>
    </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
      commentor: {
          type: String,
          required: true
      },
      content: {
          type: String,
          required: true
      },
      createdAt: {
          type: Date,
          required:true
      },
      commentorId: {
          type: Number
      },
      articleAuthorId: {
          type: Number
      },
      commentId: {
          type: Number
      }
  },
  data() {
      return {
          actualUser: localStorage.getItem("userId"),
          canEditComment: false
      }
  },
  methods: {
      commentEditing() {
          if(this.commentorId == this.actualUser ||
            localStorage.getItem("chargeCom") == true ||
            this.articleAuthorId == this.actualUser) {
              this.canEditComment = true
              console.log("canEditComment", this.canEditComment)
          }
      }
  },
  created() {
      this.commentEditing();
  }
}
</script>

<style lang="scss">
  .comment{
      border: black 2px solid;
  }
  .commentor{
      font-weight: bold;
  }
</style>