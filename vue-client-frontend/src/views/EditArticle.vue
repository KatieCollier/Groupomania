<template>
    <div>
        <LargeCurrentUser class="mb-4" />

        <ReturnButton />

        <div class="m-3">
            <div class="form-group">
                <label for="title">Titre:</label>
                <input
                    type="text"
                    id="title"
                    required
                    v-model="article.title"
                    name="title"
                />
            </div>

            <div class="form-group">
                <label for="content">Texte:</label>
                <textarea
                    type="text"
                    id="content"
                    required
                    v-model="article.content"
                    name="content"                />
            </div>
        </div>

        <div class="text-center">
            <BaseButton class="col-6 m-4"> Modifier l'image </BaseButton>
                <BaseButton class="col-6 m-4" @click="updateArticle"> Enregistrer </BaseButton>
        </div>
        
        <Footer />
        
    </div>
</template>

<script>
import LargeCurrentUser from "../components/LargeCurrentUser"
import ReturnButton from "../components/ReturnButton"
import BaseButton from "../components/BaseButton"
import Footer from "../components/Footer"

import {mapState} from "vuex"
import http from '../http-common'
import router from "../router"

export default {
    name: "editPage",
    components: {
        LargeCurrentUser,
        ReturnButton,
        BaseButton,
        Footer
    },
    computed: {
        ...mapState({
            Comments: "Comments"
        })
    },
    props: ["article"],
    methods: {
        retrieveOneArticle() {
            http
             .get("/articles/" + this.$route.params.id)
             .then(response => {
                 this.article = response.data
                 console.log(response.data)
             })
             .catch(e => {
                 console.log(e)
             })
        },
        updateArticle(){
            const data = {
                title: this.article.title,
                content: this.article.content
            }

            http
                .put("/articles/" + this.$route.params.id, data)
                .then(response => {
                    console.log(response.data)
                    router.push("/page_principale");
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    created() {
        this.retrieveOneArticle();
        console.log(this.$route.params)
    }
}
</script>

<style lang="scss">
    .form-group{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    input, textarea{
        border-radius: 5px;
        background-color: #FFD7D7;
        border: #FD2D01 1px solid;
        box-shadow: none;
        width: 100%;
    }
    textarea{
        height: 500px;
    }
</style>