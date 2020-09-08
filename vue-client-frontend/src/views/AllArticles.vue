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
        
        <div class="pagination">
            <b-pagination class="m-5"
                v-model="page"
                :total-rows="count"
                :per-page="pageSize"
                pills
                @change="handlePageChange"
            />
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
            Articles: [],
            page: 1,
            count: null,
            pageSize: 5
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
        getRequestParams(page) {
            let params = {};
            if(page) {
                params["page"] = page - 1;
            }
            return params;
        },
        retrieveArticles() {
            const params = this.getRequestParams(
                this.page
            )

            http
                .get("/articles", {params})
                .then(response => {
                this.Articles = response.data.rows;
                this.count = response.data.count
                })
                .catch(e => {
                console.log(e);
                });
        },
        refreshList() {
        this.retrieveArticles();
        },
        handlePageChange(value) {
            this.page = value;
            this.retrieveArticles();
        }
  },
  mounted() {
    this.retrieveArticles();
    }       
}
</script>

<style lang="scss">
    .pagination{
        margin: auto;
    }
</style>