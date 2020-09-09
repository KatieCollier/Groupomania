<template>
    <div class="create-article">
        <CurrentUser class="mb-4" />

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
                    name="content" />
            </div>
        </div>

        <UploadFiles />

        <div class="text-center">
            <BaseButton class="col-6 m-4" @click="addArticle"> Publier </BaseButton>
        </div>
        
        <ReturnButton />

        <Footer />
        
    </div>
</template>


<script>
import CurrentUser from "../components/LargeCurrentUser"
import ReturnButton from "../components/ReturnButton"
import UploadFiles from "../components/UploadFiles"
import BaseButton from "../components/BaseButton"
import Footer from "../components/Footer"

import http from "../http-common"
import router from "../router"

export default {
    name: "createArticle",
    components: {
        CurrentUser,
        ReturnButton,
        UploadFiles,
        BaseButton,
        Footer
    },
    data() {
        return{
            article: {},
            image: []
        }
    },
    methods: {
        addArticle() {
            const data = {
                title: this.article.title,
                content: this.article.content,
                userId: localStorage.getItem("userId"),
                imageUrl: localStorage.getItem("imageUrl")
            };
            console.log("resquest data:", data)

            http
                .post("/articles", data)
                .then(response => {
                this.article.id = response.data.id;
                console.log(response.data);
                localStorage.removeItem("imageUrl")
                router.push("/page_principale");
                })
                .catch(e => {
                console.log(e);
                });
    
                this.submitted = true;
                this.article = {};
            },
    }    
};
</script>

<style lang="scss">
@import "../_variables.scss";

    .create-article{
        .form-group{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
        }
        input, textarea{
            border-radius: 5px;
            background-color: $pink;
            border: $red 1px solid;
            box-shadow: none;
            width: 100%;
        }
        textarea{
            height: 500px;
        }
        button:hover{
          background-color: $red;
          color: white;
        }
    }
</style>