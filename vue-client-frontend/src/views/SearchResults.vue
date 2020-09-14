<template>
    <div class="search-results">
        <CurrentUser />

        <ReturnButton />

        <Subtitle class="font-weight-bold">
           Résultats: {{keyword}}...
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
import Subtitle from "../components/SubTitle"
import ArticlePreview from "../components/ArticlePreview"
import ReturnButton from "../components/ReturnButton"
import Footer from "../components/Footer"

import http from "../http-common"
import moment from "moment"

export default {
    name: "searchResults",
    components: {
        CurrentUser,
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
            pageSize: 5,
            keyword: localStorage.getItem("keyword")
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
            params["keyword"] = localStorage.getItem("keyword")
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
                localStorage.removeItem("keyword")
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

    .search-results{
        a{
            color: black;
            text-decoration: none;
            :hover{
                color: $red;
            }
        }
        button:hover{
          background-color: $red;
          color: white;
        }
    }
</style>