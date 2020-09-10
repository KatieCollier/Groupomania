<template>
    <div class="user-activity">
        <CurrentUser />

        <ReturnButton />

        <div class="subtitle-with-image">
            <Subtitle class="font-weight-bold"> {{UserWithActivity.userName}} </Subtitle>
             <img :src="image" alt="" class="subtitle-image">
        </div>
        

       
        
        <ActivityPreview 
             v-for="activity in UserActivity"
            :activityType="activity.activityType"
            :updatedAt="activity.updatedAt | formatDate"
            :content="activity.content"
            :key="activity.updatedAt"
            :activityTitle="activity.title"
            :commentArticleId="activity.articleId"
        />

        <ReturnButton />

        <Footer />
    </div>
</template>

<script>
import CurrentUser from "../components/CurrentUser"
import ReturnButton from "../components/ReturnButton"
import Subtitle from "../components/SubTitle"
import ActivityPreview from "../components/ActivityPreview"
import Footer from "../components/Footer"

import http from "../http-common"
import moment from "moment"

export default {
    name: "userActivity",
    components: {
        CurrentUser,
        ReturnButton,
        Subtitle,
        ActivityPreview,
        Footer
    },
    data() {
        return {
            UserWithActivity: [],
            UserActivity: [],
            image: "",
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
        getUserActivity() {
            http
                .get("/users/" + this.$route.params.id)
                .then(response => {
                    this.UserWithActivity = response.data
                    this.image = this.UserWithActivity.imageUrl
                    const articles = this.UserWithActivity.articles
                    const Articles = articles.map(function(o) {
                        o.activityType = "Article";
                        return o;
                    })
                    const comments = this.UserWithActivity.comments
                    const Comments = comments.map(function(o) {
                        o.activityType = "Comment on";
                        return o;
                    })
                    this.UserActivity = Articles.concat(Comments)
                    this.UserActivity.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    created() {
        this.getUserActivity();
    }
}
</script>

<style lang="scss">
@import "../_variables.scss";

    .user-activity{
        .subtitle-with-image{
            position: relative;
        }
        .subtitle-image{
            position: absolute;
            right: 20px;
            top: 0px;
            border-radius: 50%;
        }
        a{
            color: black;
            text-decoration: none;
            :hover{
                color: $red;
                text-decoration: none;
            }
        }
        button:hover{
          background-color: $red;
          color: white;
        }
    }
</style>