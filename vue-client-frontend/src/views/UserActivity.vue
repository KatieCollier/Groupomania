<!-- view of user activity -->
<template>
    <div class="user-activity">
        <CurrentUser />

        <ReturnButton />

        <!-- subtitle with name of user whose activity we are seeing -->
        <div class="subtitle-with-image">
            <Subtitle class="font-weight-bold"> {{UserWithActivity.userName}} </Subtitle>
             <img :src="image" alt="" class="subtitle-image">
        </div>
        
        <ActivityPreview class="mx-auto"
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
//import components used in view
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
    filters: { //filter to display date & time in an easy to read format
        formatDate: function(value){
            if(value) {
               return moment(String(value)).format("DD/MM/YYYY kk:mm") 
            }
        }
    },
    methods: {
        getUserActivity() { //get all activity of a given user
            http
                .get("/users/" + this.$route.params.id)
                .then(response => {
                    this.UserWithActivity = response.data //all user activity
                    this.image = this.UserWithActivity.imageUrl //user's profile pic url
                    const articles = this.UserWithActivity.articles //all the users articles
                    const Articles = articles.map(function(o) {
                        o.activityType = "Article"; //define activity type for articles
                        return o;
                    })
                    const comments = this.UserWithActivity.comments //all user's comments
                    const Comments = comments.map(function(o) {
                        o.activityType = "Comment on"; //define activity type for comments
                        return o;
                    })
                    this.UserActivity = Articles.concat(Comments) //concatenate user's articles and comments into a single array
                    this.UserActivity.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1) //order array by most recent update data
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created() { //call necessary functions when view is created
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