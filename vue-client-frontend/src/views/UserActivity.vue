<template>
    <div>
        <CurrentUser />

        <ReturnButton />

        <Subtitle> Draco Malfoy </Subtitle>

        <ActivityPreview 
             v-for="activity in SingleUser"
            :user="activity.userName"
            :activityType="activity.activityType"
            :createdAt="activity.createdAt"
            :content="activity.content"
            :key="activity.title"
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

import {mapState} from "vuex"

export default {
    name: "userActivity",
    components: {
        CurrentUser,
        ReturnButton,
        Subtitle,
        ActivityPreview,
        Footer
    },
    computed: {
        ...mapState({
            SingleUser: "SingleUser"
        })
    }
}
</script>