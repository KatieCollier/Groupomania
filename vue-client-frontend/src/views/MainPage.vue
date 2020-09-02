<template>
    <div class="mainpage">
        <CurrentUser>
        </CurrentUser>

        <SearchBar>
        </SearchBar>

        <div class="text-center m-4">
            <a href="/publier">
            <BaseButton> Créer un article </BaseButton>
            </a>
        </div>

        <Subtitle>
            Articles Récents
        </Subtitle>

        <div class="text-center m-3">
            <p v-if="Articles.length == 0"> Bravo vous êtes le premier utilisateur: <br>
         Ecrivez le tout premier article !</p>
        </div>
        
        <div class="preview m-3 p-2"
            v-for="(article, index) in Articles"
                    :key="index">

                <div class="preview-header">
                    <div class="articleInfo">
                        <router-link :to="{
                                name: 'articlePage',
                                params: { id: article.id }
                            }">
                            <p class="mb-0"> {{article.title}} </p>
                        </router-link>
                        <router-link :to="{
                                name: 'userActivity',
                                params: { id: article.userId }
                            }">
                            <p> {{article.user.userName}} </p>
                        </router-link>
                    </div>
                    <div class="creationTime">
                        <p> {{article.createdAt}} </p>
                    </div>
                </div>
                
                <div class="content">
                     {{article.content}} 
                </div>
            </div>

        <div class="m-4">
            <a href="/tous_articles">
                <BaseButton> Tous les articles </BaseButton>
            </a>
        </div>

        <Subtitle>
            Activité Récente
        </Subtitle>

        <ActivityPreview
            v-for="activity in AllActivity"
            :key="activity.updatedAt"
            :user="activity.user.userName"
            :activityType="activity.activityType"
            :activityTitle="activity.title"
            :createdAt="activity.createdAt"
            :content="activity.content"
            :commentArticleId="activity.articleId"
            :articleId="activity.id"
            :userId="activity.userId"
            >
        </ActivityPreview>

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
import ActivityPreview from "../components/ActivityPreview"
import Footer from "../components/Footer"

import http from "../http-common"

export default {
    name: "mainPage",
    components: {
        CurrentUser,
        SearchBar,
        BaseButton,
        Subtitle,
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
    methods: {
        retrieveArticles() {
        http
            .get("/articles")
            .then(response => {
            this.Articles = response.data; // JSON are parsed automatically.
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