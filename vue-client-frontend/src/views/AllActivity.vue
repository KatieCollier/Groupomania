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
            v-for="activity in Activities"
            :user="activity.user"
            :activityType="activity.activityType"
            :createdAt="activity.createdAt"
            :content="activity.content"
            :key="activity.title">
        </ActivityPreview>

        <ReturnButton />

    </div>
</template>

<script>
import CurrentUser from "../components/CurrentUser"
import SearchBar from "../components/SearchBar"
import Subtitle from "../components/SubTitle"
import ActivityPreview from "../components/ActivityPreview"
import ReturnButton from "../components/ReturnButton"

import {mapState} from "vuex"

export default {
    name: "allActivity",
    components: {
        CurrentUser,
        SearchBar,
        Subtitle,
        ActivityPreview,
        ReturnButton
    },  
    computed: {
        ...mapState({
            Activities: "Activities",
        })
    }         
}
</script>