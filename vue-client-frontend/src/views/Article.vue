<template>
    <div>
        <CurrentUser/>

        <ReturnButton/>

        <div class="article-box m-3 p-2">
            <p class="mb-0 article-info h4"> {{SingleArticle.title}} </p>
            <p class="article-info h4"> {{SingleArticle.author}} </p>
            <p class="article-time"> {{SingleArticle.createdAt}} </p>

            <div class="text-center">
                <img class="article-img img-fluid m-3" src="../images/images.jpg" alt="random image">
            </div>
        
            <p> {{SingleArticle.content}} </p>
        </div>

        <Comment class="ml-5" v-for="comment in Comments"
            :key="comment.id"
            :commentor="comment.commentor"
            :createdAt="comment.createdAt"
            :content="comment.content"
        />

        <ReturnButton/>
    </div>
</template>

<script>
import CurrentUser from "../components/CurrentUser"
import ReturnButton from "../components/ReturnButton"
import Comment from "../components/Comment"

import {mapState} from "vuex"

export default {
    name: "articlePage",
    components: {
        CurrentUser,
        ReturnButton,
        Comment
    },
    computed: {
        ...mapState({
            Articles: "Articles",
            SingleArticle: "SingleArticle",
            Comments: "Comments"
        })
    },
    props: {
      title: {
          type: String,
          required: true
      },
      author: {
          type: String,
          required: true
      },
      image: {
          type: Object
      },
      createdAt: {
          type: Date,
          required:true
      },
      content: {
          type: String,
          required: true
      }
  },
}
</script>

<style lang="scss">
    .article-box{
        border: black 2px solid;
    }
    .article-info{
        font-weight: bold;
    }
    .article-time{
        font-weight: lighter;
    }
    .article-img{
        max-width: 90%;
    }
</style>