<!-- view displaying all the information related to the article, including its fulltext and any image -->
<template>
    <div class="articlepage">
        <CurrentUser/>

        <ReturnButton/>

        <div class="m-3 m-sm-auto">
            <!-- article box -->
            <div v-if="this.article" class="article-box mb-3 p-2">
                <!-- title -->
                <p class="mb-0 article-info h4"> {{this.article.title}} </p>
                <!-- author name with link to their user activity page -->
                <router-link :to="{
                                    name: 'userActivity',
                                    params: { id: this.article.userId }
                                }"> 
                    <p class="article-info h4"> {{this.article.user.userName}} </p>
                </router-link>
                <!-- update date and time -->
                <p class="article-time"> {{this.article.updatedAt | formatDate}} </p>

                <!-- image associated with the article - only displayed if an image is present -->
                <div class="text-center">
                    <img v-if="imagePresent" class="article-img img-fluid m-3" :src="this.article.imageUrl" alt="random image">
                </div>

                <!-- article content -->
                <div class="full-content">
                    {{this.article.content}} 
                </div>

                <!-- icons with links to edit, delete or like the article -->
                <div class="action">
                    <!-- edit icon - only visilble if user authorised to edit article -->
                    <div v-if="canEdit" class="mr-3">
                        <router-link :to="{
                                name: 'editArticle',
                                params: { id: this.article.id }
                            }">
                            <img src="/images/edit.png" alt="Modifier">
                        </router-link>
                    </div>
                    <!-- delete icon - only visible if user authorised to delete the article -->
                    <div v-if="canDelete" class="mr-3">
                        <span v-on:click="deleteArticle()">
                            <img src="/images/bin.png" alt="Supprimer">
                        </span>
                    </div>
                    <!-- like icon - visible to all users -->
                    <div class="likes">
                        <!-- total number of likes the article has already received -->
                        <p class="mr-2 h4"> {{Likes.length}} </p>
                        <span @click="likeArticle">
                            <!-- if the user has already liked the article, the icon displayed will be red -->
                            <img v-if="alreadyLiked" src="/images/like-color.png" alt="Liker">
                            <!-- if the user hasn't already liked the article, the icon displayed will be white -->
                            <img v-else src="/images/like-transparent.jpg" alt="Liker">
                        </span>  
                    </div> 
                </div>

            </div>

            <!-- display all comments associated with the article -->
            <Comment class="ml-5" v-for="comment in Comments"
                :key="comment.id"
                :commentor="comment.user.userName"
                :updatedAt="comment.updatedAt | formatDate"
                :content="comment.content"
                :commentorId="comment.userId"
                :articleAuthorId="comment.article.userId"
                :commentId="comment.id"
                :NbCommentLikes="comment.commentLikes.length"
            />

            <!-- allow users to comment on the article -->
            <AddComment class="ml-5" />
        </div>

        <ReturnButton/>

        <Footer />
    </div>
</template>

<script>
//import components used in this vierw
import CurrentUser from "../components/CurrentUser"
import ReturnButton from "../components/ReturnButton"
import Comment from "../components/Comment"
import AddComment from "../components/AddComment"
import Footer from "../components/Footer"

import http from '../http-common'
import moment from "moment"

export default {
    name: "articlePage",
    components: {
        CurrentUser,
        ReturnButton,
        Comment,
        AddComment,
        Footer
    },
    data(){
        return {
            imagePresent: null,
            Comments: [],
            Likes: [],
            alreadyLiked: 0, //by default, alreadyLiked is set at zero
            CommentLikes: [],
            canEdit: false,
            canEditComment: false,
            canDelete:false,
            actualUser: localStorage.getItem("userId")
        }
    },
    filters: {
        formatDate: function(value){ //filter to display date & time in an easy to read format
            if(value) {
               return moment(String(value)).format("DD/MM/YYYY kk:mm") 
            }
        }
    },
    methods: {
        retrieveOneArticle() { //get information on the article displayed
            http
             .get("/articles/" + this.$route.params.id) //use the parameters defined in the router link to complete the path of the query
             .then(response => {
                 this.article = response.data
                 this.author = this.article.userId
                 if(this.article.imageUrl != null){ //if there is an image associated with the article, set imagePresent to true
                     this.imagePresent = true
                 }
                if(localStorage.getItem("userId") == this.author) { //if the current user is also the author of the article, allow them to...
                    this.canEdit = true; //edit the article
                    this.canDelete = true; //delete the article
                }
                if(localStorage.getItem("chargeCom") == "true") { // if the current user is in charge of communication at groupomania, 
                    this.canDelete = true; //allow them to delete the article
                }
             })
             .catch(err => {
                 console.log(err)
             })
        },
        getRelatedComments() { // function to get comments related to the article displayed
            http
                .get("/comments/articles/" + this.$route.params.id) //use the parameters defined in the router link to complete the path of the query
                .then(response => {
                    this.Comments = response.data
             })
             .catch(err => {
                 console.log(err)
             })
        },
        getLikes() { //get the likes associated with the article
            http
                .get("/likes/articles/" + this.$route.params.id) //use the parameters defined in the router link to complete the path of the query
                .then(response => {
                    this.Likes = response.data
                    for(let i = 0; i < this.Likes.length; i++) { //for each like associated with this article...
                        if(this.Likes[i].userId == this.actualUser) { //...if the userId matches that of the current user...
                            this.alreadyLiked++ //...add 1 to alreadyLiked ...
                            break //...and break out of the loop
                        }    
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        likeArticle() { //function that allows the user to like the article
            if(this.alreadyLiked == 0){ //if the current user has not already liked the article...
                const data = { //... set the data for the like with the current user's Id and the current article's id ...
                    userId: this.actualUser,
                    articleId: this.article.id
                }

                http
                    .post("/likes", data) //...post the data to the database...
                    .then(response => {
                        this.like = response.data
                        this.$router.go() //... and refresh the page to display the new like
                    })
                    .catch(err => {
                        console.log(err)
                    })
                } else { //if the current user has already like the article...
                    console.log("Déjà liké !") //... console.log a message
                } 
        },
        deleteArticle() { //function to delete an article
            http
                .delete("/articles/" + this.article.id) // delete article identidied by its id
                .then(() => {
                    this.$router.push("/page_principale"); //then return to the main page
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() { //call necessary functions at the creation of the view
        this.retrieveOneArticle();
        this.getRelatedComments();
        this.getLikes();
    }
}
</script>

<style lang="scss">
@import "../_variables.scss";

    .articlepage{
        a{
            color: black;
            text-decoration: none;
            :hover{
                color: $red;
            }
        }
        button:hover{
          background-color: $red;
          color: white;
        }
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
                color: $red;
            }
        }
    }
</style>