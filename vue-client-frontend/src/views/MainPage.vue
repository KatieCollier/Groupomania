<template>
    <div class="overview">
        <CurrentUser>
        </CurrentUser>

        <SearchBar>
        </SearchBar>

        <div class="text-center m-4">
            <BaseButton> Créer un article </BaseButton>
        </div>

        <Subtitle>
            Articles Récents
        </Subtitle>

        <a href="/article">
            <ArticlePreview
                v-for="article in Articles"
                :title="article.title"
                :author="article.author"
                :createdAt="article.createdAt"
                :content="article.content"
                :key="article.title">
            </ArticlePreview>
        </a>

        <div class="m-4">
            <a href="/tous_articles">
                <BaseButton> Tous les articles </BaseButton>
            </a>
        </div>

        <Subtitle>
            Activité Récente
        </Subtitle>

        <ActivityPreview
            v-for="activity in Activities"
            :user="activity.user"
            :activityType="activity.activityType"
            :createdAt="activity.createdAt"
            :content="activity.content"
            :key="activity.title">
        </ActivityPreview>

        <div class="m-4">
            <a href="/toute_activite">
                <BaseButton> Toute l'activité </BaseButton>
            </a>
        </div>

    </div>
</template>

<script>
import CurrentUser from "../components/CurrentUser"
import SearchBar from "../components/SearchBar"
import BaseButton from "../components/BaseButton"
import Subtitle from "../components/SubTitle"
import ArticlePreview from "../components/ArticlePreview"
import ActivityPreview from "../components/ActivityPreview"

import {mapState} from "vuex"

export default {
    name: "mainPage",
    components: {
        CurrentUser,
        SearchBar,
        BaseButton,
        Subtitle,
        ArticlePreview,
        ActivityPreview
    },  
    computed: {
        ...mapState({
            Articles: "Articles",
            Activities: "Activities"
        })
    }         
}
</script>

<style lang="scss">
    a{
        color: black;
        text-decoration: none;
    }
</style>