<template>
    <div class="mainpage">
        <CurrentUser />

        <SearchBar />

        <div class="text-center m-4">
            <a href="/publier">
            <BaseButton> Créer un article </BaseButton>
            </a>
        </div>

        <Subtitle>
            Articles Récents
        </Subtitle>
        
        <ArticlePreview
            v-for="article in Articles.slice(0, 5)"
            :key="article.id"
            :articleId="article.id"
            :title="article.title"
            :userId="article.userId"
            :author="article.user.userName"
            :updatedAt="article.updatedAt | formatDate"
            :content="article.content"
         />

        <div class="m-4">
            <a href="/tous_articles">
                <BaseButton> Tous les articles </BaseButton>
            </a>
        </div>

        <Subtitle>
            Activité Récente
        </Subtitle>

        <ActivityPreview
            v-for="activity in AllActivity.slice(0, 5)"
            :key="activity.updatedAt"
            :user="activity.user.userName"
            :activityType="activity.activityType"
            :activityTitle="activity.title"
            :updatedAt="activity.updatedAt | formatDate"
            :content="activity.content"
            :commentArticleId="activity.articleId"
            :articleId="activity.id"
            :userId="activity.userId"
            />

        <div class="m-4">
            <a href="/toute_activite">
                <BaseButton> Toute l'activité </BaseButton>
            </a>
        </div>

        <Footer />
    </div>
</template>

<script>
import CurrentUser from "../components/CurrentUser"
import SearchBar from "../components/SearchBar"
import BaseButton from "../components/BaseButton"
import Subtitle from "../components/SubTitle"
import ArticlePreview from "../components/ArticlePreview"
import ActivityPreview from "../components/ActivityPreview"
import Footer from "../components/Footer"

import http from "../http-common"
import moment from "moment"

export default {
    name: "mainPage",
    components: {
        CurrentUser,
        SearchBar,
        BaseButton,
        Subtitle,
        ArticlePreview,
        ActivityPreview,
        Footer
    },
    data() {
        return {
            Articles: [],
            Comments: [],
            AllActivity: []
        };
    },
    filters: {
        formatDate: function(value){
            if(value) {
               return moment(String(value)).format("DD/MM/YYYY kk:mm") 
            }
        }
    },
    methods: {
        retrieveArticles() {
        http
            .get("/articles")
            .then(response => {
            this.Articles = response.data; 
            this.Articles.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1)
            console.log("Articles: ", response.data);
            })
            .catch(e => {
            console.log(e);
            });
        },
        refreshList() {
        this.retrieveArticles();
        },
        getAllActivity() {
            http
                .get("/comments")
                .then(response => {
                    this.Comments = response.data
                    const comments = this.Comments.map(function(o) {
                        o.activityType = "Comment on";
                        return o;
                    })
                    const articles = this.Articles.map(function(o) {
                        o.activityType = "Article";
                        return o;
                    })
                    this.AllActivity = articles.concat(comments)
                    this.AllActivity.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1)  
                    console.log("all activity: ", this.AllActivity)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    created() {
        this.retrieveArticles();
        this.getAllActivity();
    }            
}
</script>

<style lang="scss">
    .mainpage{
        a{
            color: black;
            text-decoration: none;
        }
        .preview{
            width: 90%;
            border: black 2px solid;
            &-header{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            } 
        }
        .articleInfo{
            font-weight: bold;
        }
        .content{
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }
</style>