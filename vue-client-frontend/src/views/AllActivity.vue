<template>
    <div class="all-activity">
        <CurrentUser>
        </CurrentUser>

        <ReturnButton />

        <SearchBar class="mb-3">
        </SearchBar>

        <Subtitle>
            Activité
        </Subtitle>

        <Subtitle>
            Articles 
            
        </Subtitle>

        <button @click="toggleArticles" class="btn btn-lg btn-danger"> 
        </button>

        <div v-show="showArticles" class="activity-articles">
            <p> DISPLAY articles here</p>

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
        
        <div class="pagination">
            <b-pagination class="m-5"
                v-model="page"
                :total-rows="count"
                :per-page="pageSize"
                pills
                @change="handlePageChange"
            />
        </div>

        </div>
        

        <Subtitle>
            Commentaires
        </Subtitle>

        <button @click="toggleComments" class="btn btn-lg btn-danger">    
        </button>

        <div v-if="showComments" class="activity-comments">
            <p> DISPLAY comments here</p>

            <Comment v-for="comment in Comments"
                :key="comment.id"
                :commentor="comment.user.userName"
                :updatedAt="comment.updatedAt | formatDate"
                :content="comment.content"
                :commentorId="comment.userId"
                :articleAuthorId="comment.article.userId"
                :commentId="comment.id"
            />

            <div class="pagination">
            <b-pagination class="m-5"
                v-model="commentPage"
                :total-rows="commentCount"
                :per-page="pageSize"
                pills
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
import Comment from "../components/Comment"

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
        Comment
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