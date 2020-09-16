<template>
    <div class="edit-article">
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
                    name="content" 
                />
            </div>

            <div class="form-group">
                <label for="file"> Choisissez une image: </label>
                <input type="file" name="uploadfile" @change="uploadFile">
            </div>
        </div>

        <div class="text-center">
            <BaseButton class="col-6 col-sm-4 m-4" @click="updateArticle"> Enregistrer </BaseButton>
        </div>
        
        <Footer />
        
    </div>
</template>

<script>
import LargeCurrentUser from "../components/LargeCurrentUser"
import ReturnButton from "../components/ReturnButton"
import BaseButton from "../components/BaseButton"
import Footer from "../components/Footer"

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
    props: ["article"],
    methods: {
        retrieveOneArticle() {
            http
             .get("/articles/" + this.$route.params.id)
             .then(response => {
                 this.article = response.data
             })
             .catch(err => {
                 console.log(err)
             })
        },
        uploadFile (event) {
            this.uploadfile = event.target.files
        },
        updateArticle(){
            if(this.uploadfile){
                const formData = new FormData();
                for (const i of Object.keys(this.uploadfile)) {
                    formData.append('uploadfile', this.uploadfile[i])
                }
                formData.append("title", this.article.title)
                formData.append("content", this.article.content)
                formData.append("userId", localStorage.getItem("userId"))

                http
                    .put("/articles/" + this.$route.params.id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        router.push("/articles/" + this.$route.params.id);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                const data = {
                    title: this.article.title,
                    content: this.article.content,
                    userId: localStorage.getItem("userId")
                }

                http
                    .put("/articles/" + this.$route.params.id, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    })
                    .then(() => {
                        router.push("/articles/" + this.$route.params.id);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
            
    },
    created() {
        this.retrieveOneArticle();
    }
}
</script>

<style lang="scss">
@import "../_variables.scss";

    .edit-article{
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
    }
</style>