<!-- view of the main page of the application-->
<template>
    <div class="mainpage">
        <CurrentUser />

        <SearchBar />

        <div class="text-center m-4">
            <a href="/publier">
            <BaseButton> Créer un article </BaseButton>
            </a>
        </div>

        <!-- error message in case the page doesn't load - only displayed in case of error -->
        <div class="notLoading text-center m-3 p-3" v-if="loadError">
            <p> Il y a eu un petit problème lors du chargement de la page <br>
            Veuillez réessayer </p>
            <!-- button allows user to refresh the page in case of error -->
            <BaseButton @click="refresh"> Rafraichir la page </BaseButton>
        </div>

        <!-- article section -->
        <Subtitle class="font-weight-bold">
            Articles Récents
        </Subtitle>
        
        <ArticlePreview class="mx-auto"
            v-for="article in Articles"
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
                <BaseButton class="ml-md-5"> Tous les articles </BaseButton>
            </a>
        </div>

        <!-- activity section-->
        <Subtitle class="font-weight-bold">
            Activité Récente
        </Subtitle>

        <ActivityPreview class="mx-auto"
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
                <BaseButton class="ml-md-5"> Toute l'activité </BaseButton>
            </a>
        </div>

        <Footer />
    </div>
</template>

<script>
//import components used in view
import CurrentUser from "../components/CurrentUser"
import SearchBar from "../components/SearchBar"
import BaseButton from "../components/BaseButton"
import Subtitle from "../components/SubTitle"
import ArticlePreview from "../components/ArticlePreview"
import ActivityPreview from "../components/ActivityPreview"
import Footer from "../components/Footer"

import http from "../http-common"
import moment from "moment"
import router from "../router"

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
            AllActivity: [],
            loadError: false
        };
    },
    filters: {
        formatDate: function(value){ //filter to display date & time in an easy to read format
            if(value) {
               return moment(String(value)).format("DD/MM/YYYY kk:mm") 
            }
        }
    },
    methods: {
        retrieveArticles() { //get information about the first 5 articles
            let params = {};
            params["page"] = 0; //page set at 0 as we want the first 5 articles only

            http
                .get("/articles", {params})
                .then(response => {
                    this.Articles = response.data.rows;
                })
                .catch(err => {
                    console.log(err);
                    this.loadError = true; //in case of error, change loadError to true
                });
        },
        refresh(){ // function to reload page
            router.go()
        },
        getAllActivity() { //get information on all activity - articles and comments
            let params = {};
            params["page"] = 0 //page set at 0 as we want the first 5 articles and comments only

            http
                .get("/comments", {params}) //get the first 5 comments - articles already retrieved in previous function
                .then(response => {
                    this.Comments = response.data.rows
                    const comments = this.Comments.map(function(o) {
                        o.activityType = "Comment on"; //define the activity type of comments
                        return o;
                    })
                    const articles = this.Articles.map(function(o) {
                        o.activityType = "Article"; //define the article type of articles
                        return o;
                    })
                    this.AllActivity = articles.concat(comments) //concatenate articles and comments into a single array
                    this.AllActivity.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1) // order the array by most recent update date
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created() { //call necessary function during the creation of the view
        this.retrieveArticles();
        this.getAllActivity();
    }            
}
</script>

<style lang="scss">
@import "../_variables.scss";

    .mainpage{
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
        .notLoading{
            border: $red solid 5px;
            font-weight: bold;
        }
    }
</style>