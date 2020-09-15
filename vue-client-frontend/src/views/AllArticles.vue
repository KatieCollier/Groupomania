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

        <Subtitle class="font-weight-bold">
            Articles
        </Subtitle>

        <ArticlePreview class="mx-auto"
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
            <b-pagination class="m-auto"
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
                this.count = response.data.count;
                console.log("count", this.count)
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
@import "../_variables.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";

    .all-articles{
        a{
            color: black;
            text-decoration: none;
        }
    }
</style>