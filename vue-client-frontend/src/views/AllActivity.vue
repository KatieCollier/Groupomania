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

        <DropTitle @click="toggleArticles" class="font-weight-bold"> Voir les articles </DropTitle>

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
        
        <DropTitle @click="toggleComments" class="font-weight-bold"> Voir les commentaires </DropTitle>

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

        <ReturnButton />

        <Footer />

    </div>
</template>

<script>
import CurrentUser from "../components/CurrentUser"
import SearchBar from "../components/SearchBar"
import Subtitle from "../components/SubTitle"
import ReturnButton from "../components/ReturnButton"
import Footer from "../components/Footer"
import ArticlePreview from "../components/ArticlePreview"
import DropTitle from "../components/DropTitle"
import CommentPreview from "../components/CommentPreview"

import http from "../http-common"
import moment from "moment"

export default {
    name: "allActivity",
    components: {
        CurrentUser,
        SearchBar,
        Subtitle,
        ReturnButton,
        Footer,
        ArticlePreview,
        DropTitle,
        CommentPreview
    },  
    data() {
        return {
            Articles: [],
            Comments: [],
            AllActivity: [],
            showArticles: false,
            showComments: false,
            page: 1,
            count: null,
            pageSize: 5,
            commentPage: 1,
            commentCount: 0
        }
    },
    filters: {
        formatDate: function(value){
            if(value) {
               return moment(String(value)).format("DD/MM/YYYY kk:mm") 
            }
        }
    },
    methods: {
        getRequestParams(page) {
            let params = {};
            if(page) {
                params["page"] = page - 1;
            }
            return params;
        },
        retrieveArticles() {
            const params = this.getRequestParams(
                this.page
            )

            http
                .get("/articles", {params})
                .then(response => {
                this.Articles = response.data.rows;
                this.count = response.data.count
                })
                .catch(e => {
                console.log(e);
                });
        },
        retrieveComments() {
            const params = this.getRequestParams(
                this.commentPage
            )

            http
                .get("/comments", {params})
                .then(response => {
                this.Comments = response.data.rows;
                this.commentCount = response.data.count
                })
                .catch(e => {
                console.log(e);
                });
        },
            toggleArticles() {
                if(this.showArticles == false) {
                    this.showArticles = true
                } else {
                    this.showArticles = false
                }
            },
            toggleComments() {
                if(this.showComments == false) {
                    this.showComments = true
                } else {
                    this.showComments = false
                }
            },
            handlePageChange(value) {
            this.page = value;
            this.retrieveArticles();
        },
        handleCommentPageChange(value) {
            this.commentPage = value;
            this.retrieveComments();
        }
    },
    created(){
        this.retrieveArticles();
        this.retrieveComments();
    }
}
</script>

<style lang="scss">
    @import "../_variables.scss";
    @import "../node_modules/bootstrap/scss/bootstrap.scss";

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