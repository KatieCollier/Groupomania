<template>
    <div>
        <CurrentUser/>

        <ReturnButton/>

        <div v-if="this.article" class="article-box m-3 p-2">
            <p class="mb-0 article-info h4"> {{this.article.title}} </p>
            <a href="/activite_utilisateur"> 
                <p class="article-info h4"> {{this.article.user.userName}} </p>
            </a>
            <p class="article-time"> {{this.article.createdAt}} </p>

            <div class="text-center">
                <img class="article-img img-fluid m-3" src="/images/images.jpg" alt="random image">
            </div>

            <div class="full-content">
                <p> {{this.article.content}} </p>
            </div>

            <div class="action">
                <div v-if="canEdit" class="mr-3">
                    <router-link :to="{
                            name: 'editArticle',
                            params: { id: this.article.id }
                        }">
                        <img src="/images/edit.png" alt="Modifier">
                    </router-link>
                </div>
                <div v-if="canDelete" class="mr-3">
                    <span v-on:click="deleteArticle()">
                        <img src="/images/bin.png" alt="Supprimer">
                    </span>
                </div>
                <div class="likes">
                    <p class="mr-2 h4"> {{Likes.length}} </p>
                    <span @click="likeArticle">
                        <img v-if="alreadyLiked" src="/images/like-color.png" alt="Liker">
                        <img v-else src="/images/like-transparent.jpg" alt="Liker">
                    </span>  
                </div> 
            </div>

        </div>

        <Comment class="ml-5" v-for="comment in Comments"
            :key="comment.id"
            :commentor="comment.user.userName"
            :createdAt="comment.createdAt"
            :content="comment.content"
            :commentorId="comment.userId"
            :articleAuthorId="comment.article.userId"
            :commentId="comment.id"
            :NbCommentLikes="comment.commentLikes.length"
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
    props: ["article"],
    data(){
        return {
            Comments: [],
            Likes: [],
            alreadyLiked: 0,
            CommentLikes: [],
            canEdit: false,
            canEditComment: false,
            canDelete:false,
            actualUser: localStorage.getItem("userId")
        }
    },
    methods: {
        retrieveOneArticle() {
            http
             .get("/articles/" + this.$route.params.id)
             .then(response => {
                 this.article = response.data
                 this.author = this.article.userId
                if(localStorage.getItem("userId") == this.author) {
                    this.canEdit = true;
                }
                if(localStorage.getItem("userId") == this.author ||
                    localStorage.getItem("chargeCom") == true) {
                        this.canDelete = true;
                }
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
        getRelatedComments() {
            http
                .get("/comments/articles/" + this.$route.params.id)
                .then(response => {
                 this.Comments = response.data
             })
             .catch(e => {
                 console.log(e)
             })
        },
        likeArticle() {
            if(this.alreadyLiked == 0){
                const data = {
                    userId: this.actualUser,
                    articleId: this.article.id
                }

                http
                    .post("/likes", data)
                    .then(response => {
                        this.like = response.data
                        console.log(response.data)
                        this.$router.go()
                    })
                    .catch(e => {
                        console.log(e)
                    })

                    this.like = {}
                } else {
                    console.log("Déjà liké !")
                } 
        },
        getLikes() {
            http
                .get("/likes/articles/" + this.$route.params.id)
                .then(response => {
                    this.Likes = response.data
                    console.log("Likes :", this.Likes)
                    for(let i = 0; i < this.Likes.length; i++) {
                        if(this.Likes[i].userId == this.actualUser) {
                            this.alreadyLiked++
                            console.log("alreadyLiked: ", this.alreadyLiked)
                        }    
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    created() {
        this.getLikes();
        this.retrieveOneArticle();
        this.getRelatedComments();
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
        justify-content: flex-end;
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