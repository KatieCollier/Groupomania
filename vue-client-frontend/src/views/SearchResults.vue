<!-- view to display search results -->
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
//import components used in view
import CurrentUser from "../components/CurrentUser"
import ReturnButton from "../components/ReturnButton"
import Subtitle from "../components/SubTitle"
import ArticlePreview from "../components/ArticlePreview"
import Footer from "../components/Footer"

import http from "../http-common"
import moment from "moment"

export default {
    name: "searchResults",
    components: {
        CurrentUser,
        ReturnButton,
        Subtitle,
        ArticlePreview,
        Footer
    },
    data() {
        return {
            Articles: [],
            page: 1, //default page
            count: null,
            pageSize: 5,
            keyword: localStorage.getItem("keyword") //define the keyword
        };
    },
    filters: { //filter to display date & time in an easy to read format
        formatDate: function(value){
            if(value) {
               return moment(String(value)).format("DD/MM/YYYY kk:mm") 
            }
        }
    },
    methods: {
        getRequestParams(page) { // set parameters: page and keyword
            let params = {};
            if(page) {
                params["page"] = page - 1;
            }
            params["keyword"] = localStorage.getItem("keyword")
            return params;
        },
        handlePageChange(value) { // set page to the number clicked in pagination
            this.page = value;
            this.retrieveArticles();
        },
        retrieveArticles() { //get all articles that correspond to these parameters
            const params = this.getRequestParams(
                this.page
            )

            http
                .get("/articles", {params})
                .then(response => {
                    this.Articles = response.data.rows; //array of articles in the page
                    this.count = response.data.count //total number of articles that correspond to the parameters
                    localStorage.removeItem("keyword") //delete the keyword from the local storage - it is no longer needed
                    })
                .catch(err => {
                    console.log(err);
                });
        },   
  },
  created() { //call necessary functions when view is created
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