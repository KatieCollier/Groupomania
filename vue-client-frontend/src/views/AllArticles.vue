<!-- view displaying all article previews at 5 per page-->
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
//import components used in this view
import CurrentUser from "../components/CurrentUser"
import ReturnButton from "../components/ReturnButton"
import SearchBar from "../components/SearchBar"
import BaseButton from "../components/BaseButton"
import Subtitle from "../components/SubTitle"
import ArticlePreview from "../components/ArticlePreview"
import Footer from "../components/Footer"

import http from "../http-common"
import moment from "moment"

export default {
    name: "allActivity",
    components: {
        CurrentUser,
        ReturnButton,
        SearchBar,
        BaseButton,
        Subtitle,
        ArticlePreview,
        Footer
    },
    data() {
        return {
            Articles: [],
            page: 1, //default page number
            count: null,
            pageSize: 5 //number of articles per page
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
        getRequestParams(page) { // function to set request parameters (the page to be displayed) depending on the selected page in pagination
            let params = {};
            if(page) {
                params["page"] = page - 1;
            }
            return params;
        },
        handlePageChange(value) { // function that set page value for the articles depending on the page number selected in pagination
            this.page = value;
            this.retrieveArticles();
        },
        retrieveArticles() {// get the information about all the articles in a page
            const params = this.getRequestParams( //using the page parameters previously defined
                this.page
            )

            http
                .get("/articles", {params})
                .then(response => {
                    this.Articles = response.data.rows; //array with information of all articles on page
                    this.count = response.data.count; //total number of articles present in the database
                })
                .catch(err => {
                    console.log(err);
                });
        }        
  },
  created() { //call necessary functions at the creation of the view
    this.retrieveArticles();
    }       
}
</script>

<style lang="scss">
@import "../_variables.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";//import bootstrap to allow me to change pagination default settings

    .all-articles{
        a{
            color: black;
            text-decoration: none;
        }
    }
</style>