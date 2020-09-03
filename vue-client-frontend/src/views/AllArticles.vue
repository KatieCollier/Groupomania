<template>
    <div class="all-articles">
        <CurrentUser />

        <ReturnButton />

        <SearchBar />

        <div class="text-center m-4">
            <a href="/publier">
                <BaseButton> Créer un article </BaseButton>
            </a>
        </div>

        <Subtitle>
            Articles
        </Subtitle>

        <ArticlePreview
            v-for="article in Articles"
            :key="article.id"
            :articleId="article.id"
            :title="article.title"
            :userId="article.userId"
            :author="article.user.userName"
            :updatedAt="article.updatedAt | formatDate"
            :content="article.content"
         />

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

import http from "../http-common"
import moment from "moment"

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
    data() {
        return {
            Articles: []
        };
    },
    filters: {
        formatDate: function(value){
            if(value) {
               return moment(String(value)).format("DD/MM/YYYY kk:mm") 
            }
        }
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