<template>
    <div class="mainpage">
        <CurrentUser />

        <SearchBar />

        <div class="text-center m-4">
            <a href="/publier">
            <BaseButton> Créer un article </BaseButton>
            </a>
        </div>

        <div class="notLoading text-center m-3 p-3" v-if="loadError">
            <p> Il y a eu un petit problème lors du chargement de la page <br>
            Veuillez réessayer </p>
            <BaseButton @click="refresh"> Rafraichir la page </BaseButton>
        </div>

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
        formatDate: function(value){
            if(value) {
               return moment(String(value)).format("DD/MM/YYYY kk:mm") 
            }
        }
    },
    methods: {
        retrieveArticles() {
            let params = {};
            params["page"] = 0;
            
            console.log("token", localStorage.getItem("token"))
            console.log("HTTP", http.defaults.headers.Authorization)
            const httpAuth = http.defaults.headers.Authorization

            if(httpAuth == localStorage.getItem("token")) {
                console.log("Authorization ok")
            } else {
                console.log("Houston, we have a problem")
            }

            http
                .get("/articles", {params})
                .then(response => {
                    this.Articles = response.data.rows;
                    console.log("Articles: ", response.data);
                })
                .catch(err => {
                    console.log(err);
                    this.loadError = true;
                });
        },
        refreshList() {
            this.retrieveArticles();
        },
        refresh(){
            router.go()
        },
        getAllActivity() {
            let params = {};
            params["page"] = 0

            http
                .get("/comments", {params})
                .then(response => {
                    this.Comments = response.data.rows
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
                .catch(err => {
                    console.log(err)
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