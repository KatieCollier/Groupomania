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
                <img class="article-img img-fluid m-3" src="/images/images.jpg" alt="random image">
            </div>

            <div class="full-content">
                <p> {{this.article.content}} </p>
            </div>

            <div class="action">
                <div>
                    <router-link :to="{
                            name: 'editArticle',
                            params: { id: this.article.id }
                        }">
                        <img src="/images/edit.png" alt="Modifier">
                    </router-link>
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
        },
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
        },
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