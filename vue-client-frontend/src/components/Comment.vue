<template>
    <div class="comment m-3 p-2">
        <router-link :to="{
                            name: 'userActivity',
                            params: { id: commentorId }
                        }">
            <p class="commentor mb-0"> {{commentor}} </p>
        </router-link>
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
            <div v-if="canDeleteComment" @click="deleteComment">
                <img src="/images/bin.png" alt="Supprimer">
            </div>
            <div class="likes">
                <p class="mr-2 h4"> {{NbCommentLikes}} </p>
                <div @click="likeComment">
                    <img src="/images/like.jpg" alt="Liker">
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import http from "../http-common"

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
      },
      NbCommentLikes: {
          type: Number
      }
  },
  data() {
      return {
          actualUser: localStorage.getItem("userId"),
          canEditComment: false,
          canDeleteComment: false,
          CommentLikes: [],
          commentAlreadyLiked: 0,
      }
  },
  methods: {
      commentEditing() {
          if(this.commentorId == this.actualUser) {
              this.canEditComment = true
              console.log("canEditComment", this.canEditComment)
          }
      },
      commentDeleting() {
          if(this.commentorId == this.actualUser ||
            localStorage.getItem("chargeCom") == true ||
            this.articleAuthorId == this.actualUser) {
              this.canDeleteComment = true
              console.log("canEditComment", this.canEditComment)
          }
      },
      deleteComment() {
          http
                .delete("/comments/" + this.commentId)
                .then(response => {
                    console.log(response.data);
                    this.$emit("refreshData");
                    this.$router.go();
                })
                .catch(e => {
                    console.log(e);
                });
      }, 
      getCommentLikes() {
        http
            .get("commentLikes/comments/" + this.commentId)
            .then(response => {
                this.CommentLikes = response.data
                for(let i = 0; i < this.CommentLikes.length; i++) {
                    if(this.CommentLikes[i].userId == this.actualUser) {
                        this.commentAlreadyLiked++
                    }
                }
            })
      },
      likeComment() {

            if(this.commentAlreadyLiked == 0) {
                const data = {
                    userId: this.actualUser,
                    commentId: this.commentId
                }

                http
                    .post("/commentLikes", data)
                    .then(response => {
                        this.commentLike = response.data
                        console.log(response.data)
                        this.$router.go()
                    })
                    .catch(e => {
                        console.log(e)
                    })

                    this.commentLike = {}

                    this.commentAlreadyLiked = 0
            } else {
                console.log("Déjà liké !", this.commentAlreadyLiked)
            }       
        }, 
  },
  created() {
      this.commentEditing();
      this.commentDeleting();
      this.getCommentLikes();
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