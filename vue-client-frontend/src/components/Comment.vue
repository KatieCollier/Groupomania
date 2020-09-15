<!-- component to show a comment in the full article page -->
<template>
    <div class="comment ml-3 mb-3 p-2">
        <!-- author of the comment and link to their user actvity page -->
        <router-link :to="{
                            name: 'userActivity',
                            params: { id: commentorId }
                        }">
            <p class="commentor mb-0"> {{commentor}} </p>
        </router-link>
        <!-- time of update -->
        <p> {{updatedAt}} </p>
        <!-- content of comment -->
        <p> {{content}} </p>

        <div class="action">
            <!-- link to edit comment page displayed if user authorised to modify comment -->
            <div v-if="canEditComment">
                <router-link :to="{
                            name: 'editComment',
                            params: { id: commentId }
                        }">
                    <img src="/images/edit.png" alt="Modifier">
                </router-link>
            </div>
            <!-- button to delete comment if user authorised to delete comment -->
            <div v-if="canDeleteComment" @click="deleteComment">
                <img src="/images/bin.png" alt="Supprimer">
            </div>
            <!-- button to like comment -->
            <div class="likes">
                <!-- number of likes this comment has received -->
                <p class="mr-2 h4"> {{NbCommentLikes}} </p>
                <div @click="likeComment">
                    <!-- if the cureent user has already liked this comment, the image is colored -->
                    <img v-if="commentAlreadyLiked" src="/images/like-color.png" alt="Liker">
                    <!-- if the cureent user has NOT already liked this comment, the image is white -->
                    <img v-else src="/images/like-transparent.jpg" alt="Liker">
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
          type: String
      },
      content: {
          type: String
      },
      updatedAt: {
          type: Date
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
      getCommentLikes() { /*function to get the number likes this comment has and to determine weather 
      the current user has already liked the comment */
        http
            .get("commentLikes/comments/" + this.commentId)
            .then(response => {
                this.CommentLikes = response.data
                for(let i = 0; i < this.CommentLikes.length; i++) { //for each like...
                    if(this.CommentLikes[i].userId == this.actualUser) { //...check if the userId is the same as that of the current user...
                        this.commentAlreadyLiked++; //... if yes, add one to commentAlreadyLiked ...
                        break //... and break out of the for loop
                    }
                }
            })
      },
      likeComment() { //function like a comment
            if(this.commentAlreadyLiked == 0) { //... if the current user hasn't already liked the comment...
                const data = { //... create the like data ...
                    userId: this.actualUser,
                    commentId: this.commentId
                }

                http //... and post it to the database
                    .post("/commentLikes", data)
                    .then(response => {
                        this.commentLike = response.data;
                        this.$router.go();
                    })
                    .catch(err => {
                        console.log(err)
                    })                    
            } else { //if the current user has already liked the comment ...
                console.log("Déjà liké !") //..send a message to the console
            }       
        },
        deleteComment() { //funstion to delete comment
          http
                .delete("/comments/" + this.commentId)
                .then(() => {
                    this.$router.go();
                })
                .catch(err => {
                    console.log(err);
                });
      },
      commentEditing() { //if the current user is also the author of the comment, they may edit it
          if(this.commentorId == this.actualUser) {
              this.canEditComment = true
          }
      },
      commentDeleting() { /*if the current user is the author of the comment, the author of the associated article or 
      in charge of communication, they may delete this comment */
          if(this.commentorId == this.actualUser ||
            localStorage.getItem("chargeCom") == "true" ||
            this.articleAuthorId == this.actualUser) {
              this.canDeleteComment = true
              console.log("canEditComment", this.canEditComment)
          }
      },  
  },
  created() { //call necessary functions at the creation of the view
      this.getCommentLikes();
      this.commentEditing();
      this.commentDeleting();
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