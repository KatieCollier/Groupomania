<template>
    <div class="overview">
        <CurrentUser>
        </CurrentUser>

        <ReturnButton />

        <SearchBar>
        </SearchBar>

        <div class="text-center m-4">
            <BaseButton> Créer un article </BaseButton>
        </div>

        <Subtitle>
            Articles
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

        <ReturnButton />

        <Footer />

    </div>
</template>

<script>
import CurrentUser from "../components/CurrentUser"
import SearchBar from "../components/SearchBar"
import BaseButton from "../components/BaseButton"
import Subtitle from "../components/SubTitle"
import ArticlePreview from "../components/ArticlePreview"
import ReturnButton from "../components/ReturnButton"
import Footer from "../components/Footer"

import {mapState} from "vuex"

export default {
    name: "allActivity",
    components: {
        CurrentUser,
        SearchBar,
        BaseButton,
        Subtitle,
        ArticlePreview,
        ReturnButton,
        Footer
    },  
    computed: {
        ...mapState({
            Articles: "Articles",
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