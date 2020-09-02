<template>
    <div class="overview">
        <CurrentUser>
        </CurrentUser>

        <ReturnButton />

        <SearchBar class="mb-3">
        </SearchBar>

        <Subtitle>
            Activité
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

        <ReturnButton />

        <Footer />

    </div>
</template>

<script>
import CurrentUser from "../components/CurrentUser"
import SearchBar from "../components/SearchBar"
import Subtitle from "../components/SubTitle"
import ActivityPreview from "../components/ActivityPreview"
import ReturnButton from "../components/ReturnButton"
import Footer from "../components/Footer"

import http from "../http-common"

export default {
    name: "allActivity",
    components: {
        CurrentUser,
        SearchBar,
        Subtitle,
        ActivityPreview,
        ReturnButton,
        Footer
    },  
    data() {
        return {
            Articles: [],
            Comments: [],
            AllActivity: []
        }
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
    created(){
        this.retrieveArticles();
        this.getAllActivity();
    }
}
</script>