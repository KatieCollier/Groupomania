<template>
    <div>
        <CurrentUser />

        <ReturnButton />

        <Subtitle> {{UserWithActivity.userName}} </Subtitle>
        
        <ActivityPreview 
             v-for="activity in UserActivity"
            :activityType="activity.activityType"
            :createdAt="activity.createdAt"
            :content="activity.content"
            :key="activity.createdAt"
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
        }
    },
    methods: {
        getUserActivity() {
            http
                .get("/users/" + this.$route.params.id)
                .then(response => {
                    this.UserWithActivity = response.data
                    const articles = this.UserWithActivity.articles
                    const Articles = articles.map(function(o) {
                        o.activityType = "Article";
                        return o;
                    })
                    const comments = this.UserWithActivity.comments
                    const Comments = comments.map(function(o) {
                        o.activityType = "Comment";
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