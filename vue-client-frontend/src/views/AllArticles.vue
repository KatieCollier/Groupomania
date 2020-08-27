<template>
    <div class="overview">
        <CurrentUser>
        </CurrentUser>

        <ReturnButton />

        <SearchBar>
        </SearchBar>

        <div class="text-center m-4">
            <a href="/publier">
                <BaseButton> Créer un article </BaseButton>
            </a>
        </div>

        <Subtitle>
            Articles
        </Subtitle>

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
                    <p> {{article.user.userName}} </p>
                </div>
                <div class="creationTime">
                    <p> {{article.createdAt}} </p>
                </div>
            </div>
            
            <div class="content">
                <p> {{article.content}} </p>
            </div>
        </div>

        <ReturnButton />

        <Footer />

    </div>
</template>

<script>
import CurrentUser from "../components/CurrentUser"
import SearchBar from "../components/SearchBar"
import BaseButton from "../components/BaseButton"
import Subtitle from "../components/SubTitle"
import ReturnButton from "../components/ReturnButton"
import Footer from "../components/Footer"

import http from "../http-common"

export default {
    name: "allActivity",
    components: {
        CurrentUser,
        SearchBar,
        BaseButton,
        Subtitle,
        ReturnButton,
        Footer
    },
    data() {
        return {
            Articles: []
        };
    },
    methods: {
        retrieveArticles() {
        http
            .get("/articles")
            .then(response => {
            this.Articles = response.data; // JSON are parsed automatically.
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
    },
    refreshList() {
      this.retrieveArticles();
    }
    /* eslint-enable no-console */
  },
  mounted() {
    this.retrieveArticles();
    }       
}
</script>

<style lang="scss">
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
</style>