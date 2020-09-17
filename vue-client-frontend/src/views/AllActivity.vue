<!-- view displaying all activity previews, divided into articles and comments-->
<template>
    <div class="all-activity">
        <CurrentUser>
        </CurrentUser>

        <ReturnButton />

        <SearchBar class="mb-3">
        </SearchBar>

        <Subtitle class="font-weight-bold">
            Activité
        </Subtitle>
        
        <div class="row mx-2">
            <!-- Article section -->
            <!-- Mobile: displayed above the comment section as a dropdown section -->
            <!-- medium sized screen: displayed as an open section next to the comments-->
            <div class="articles-in-activity col-12 col-md-6">
                <DropTitle @click="toggleArticles" class="font-weight-bold"> Voir les articles </DropTitle>

                <!-- This section is only shown if showArticles is true -->
                <div v-show="showArticles" class="activity-articles">

                    <ArticlePreview
                    v-for="article in Articles"
                    :key="article.id"
                    :articleId="article.id"
                    :title="article.title"
                    :userId="article.userId"
                    :author="article.user.userName"
                    :updatedAt="article.updatedAt | formatDate"
                    :content="article.content"
                    />
            
                    <div class="pagination text-center">
                        <b-pagination class="mx-auto"
                            v-model="page"
                            :total-rows="count"
                            :per-page="pageSize"
                            pills
                            align="center"
                            @change="handlePageChange"
                        />
                    </div>
                </div>
            </div>
            
            <div class="comments-in-activity col-12 col-md-6">
                <DropTitle @click="toggleComments" class="font-weight-bold"> Voir les commentaires </DropTitle>

                <!-- this section is only shown if showComments is true-->
                <div v-if="showComments" class="activity-comments">

                    <CommentPreview v-for="comment in Comments"
                        :key="comment.id"
                        :updatedAt="comment.updatedAt | formatDate"
                        :commentArticleId="comment.articleId"
                        :userId="comment.userId"
                        :user="comment.user.userName"
                        :content="comment.content"
                    />

                    <div class="pagination">
                    <b-pagination class="m-auto"
                        v-model="commentPage"
                        :total-rows="commentCount"
                        :per-page="pageSize"
                        pills
                        align="center"
                        @change="handleCommentPageChange"
                    />
                    </div>
                </div>
            </div>
        </div>

        <ReturnButton />

        <Footer />

    </div>
</template>

<script>
//import components used in this view
import CurrentUser from "../components/CurrentUser"
import ReturnButton from "../components/ReturnButton"
import SearchBar from "../components/SearchBar"
import Subtitle from "../components/SubTitle"
import DropTitle from "../components/DropTitle"
import ArticlePreview from "../components/ArticlePreview"
import CommentPreview from "../components/CommentPreview"
import Footer from "../components/Footer"

import http from "../http-common"
import moment from "moment"

export default {
    name: "allActivity",
    components: {
        CurrentUser,
        ReturnButton,
        SearchBar,
        Subtitle,
        DropTitle,
        ArticlePreview,
        CommentPreview,
        Footer
    },  
    data() {
        return {
            Articles: [],
            Comments: [],
            AllActivity: [],
            showArticles: false,
            showComments: false,
            page: 1, //default page number
            count: null,
            pageSize: 5, //number of previews per page
            commentPage: 1,
            commentCount: 0
        }
    },
    filters: {  //filter to display date & time in an easy to read format
        formatDate: function(value){
            if(value) {
               return moment(String(value)).format("DD/MM/YYYY kk:mm") 
            }
        }
    },
    methods: {
        getRequestParams(page) { // function to set request parameters (the page to be displayed) depending on the selected page in pagination
            let params = {};
            if(page) {
                params["page"] = page - 1;
            }
            return params;
        },
        handlePageChange(value) { // function that set page value for the articles depending on the page number selected in pagination
            this.page = value;
            this.retrieveArticles();
        },
        handleCommentPageChange(value) { // function that set page value for the comments depending on the page number selected in pagination
            this.commentPage = value;
            this.retrieveComments();
        },
        retrieveArticles() { // get the information about all the articles in a page
            const params = this.getRequestParams( //using the page parameters previously defined
                this.page
            )

            http
                .get("/articles", {params})
                .then(response => {
                    this.Articles = response.data.rows; //array with information of all articles on page
                    this.count = response.data.count //total number of articles present in the database
                })
                .catch(err => {
                    console.log(err);
                });
        },
        retrieveComments() { //get the information about all the comments in a page
            const params = this.getRequestParams( //using the page parameters previously defined
                this.commentPage
            )

            http
                .get("/comments", {params})
                .then(response => {
                    this.Comments = response.data.rows; //array with information for all comments on a page
                    this.commentCount = response.data.count //total number of comments present in the databas
                })
                .catch(err => {
                    console.log(err);
                });
        },
        toggleArticles() { //function to toggle the article section on and off with a click on the dropdown title
            if(this.showArticles == false) {
                this.showArticles = true
            } else {
                this.showArticles = false
            }
        },   
        toggleComments() {//function to toggle the comment section on and off with a click on the dropdown title
            if(this.showComments == false) {
                this.showComments = true
            } else {
                this.showComments = false
            }
        },
        showInfo() { //function to automatically set showArticles and showComments to true if the screen is medium or bigger
            if(window.screen.width > 767){
                this.showArticles = true;
                this.showComments = true;
            }
        }
    },
    created(){ //call necessary functions at the creation of the view
        this.retrieveArticles();
        this.retrieveComments();
        this.showInfo();
    }
}
</script>

<style lang="scss">
    @import "../_variables.scss";
    @import "../node_modules/bootstrap/scss/bootstrap.scss"; //import bootstrap to allow me to change pagination default settings

    .all-activity{
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
    }
</style>