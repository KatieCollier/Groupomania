<template>
    <div>
        <CurrentUser/>

        <ReturnButton/>

        <div v-if="this.article" class="article-box m-3 p-2">
            <p class="mb-0 article-info h4"> {{this.article.title}} </p>
            <a href="/activite_utilisateur"> 
                <p class="article-info h4"> {{this.article.author}} </p>
            </a>
            <p class="article-time"> {{this.article.createdAt}} </p>

            <div class="text-center">
                <img class="article-img img-fluid m-3" src="../images/images.jpg" alt="random image">
            </div>
        
            <p> {{this.article.content}} </p>

            <ActionBar> </ActionBar> 

        </div>

        <Comment class="ml-5" v-for="comment in Comments"
            :key="comment.id"
            :commentor="comment.commentor"
            :createdAt="comment.createdAt"
            :content="comment.content"
        />

        <AddComment class="ml-5 mr-3" />

        <ReturnButton/>

        <Footer />
    </div>
</template>

<script>
import CurrentUser from "../components/CurrentUser"
import ReturnButton from "../components/ReturnButton"
import Comment from "../components/Comment"
import ActionBar from "../components/ActionBarArticle"
import AddComment from "../components/AddComment"
import Footer from "../components/Footer"

import {mapState} from "vuex"
import http from '../http-common'

export default {
    name: "articlePage",
    components: {
        CurrentUser,
        ReturnButton,
        Comment,
        ActionBar,
        AddComment,
        Footer
    },
    computed: {
        ...mapState({
            Comments: "Comments"
        })
    },
    props: ["article"],
    methods: {
        retrieveOneArticle() {
            http
             .get("/articles/" + this.$route.params.id)
             .then(response => {
                 this.article = response.data
                 console.log(response.data)
             })
             .catch(e => {
                 console.log(e)
             })
        }
    },
    mounted(){
        //this.retrieveOneArticle();
    },
    created() {
        this.retrieveOneArticle();
        console.log(this.$route.params)
    }
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