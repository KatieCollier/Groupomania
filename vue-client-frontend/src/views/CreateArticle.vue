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
        
        <div class="form-group">
                <label for="file"> Choisissez une image: </label>
                <input type="file" name="uploadfile" @change="uploadFile">
            </div>

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
import BaseButton from "../components/BaseButton"
import Footer from "../components/Footer"

import http from "../http-common"
import router from "../router"

export default {
    name: "createArticle",
    components: {
        CurrentUser,
        ReturnButton,
        BaseButton,
        Footer
    },
    data() {
        return{
            article: {},
            image: [],
            uploadfile: null
        }
    },
    methods: {
        uploadFile (event) {
            this.uploadfile = event.target.files
            console.log("Uploaded file: ", this.uploadfile)
        },
        addArticle() {
            if(this.uploadfile){
                const formData = new FormData();
            for (const i of Object.keys(this.uploadfile)) {
                formData.append('uploadfile', this.uploadfile[i])
            }
            formData.append("title", this.article.title)
            formData.append("content", this.article.content)
            formData.append("userId", localStorage.getItem("userId"))

            http
                .post("/articles", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                .then(response => {
                this.article.id = response.data.id;
                console.log(response.data);
                router.push("/page_principale");
                })
                .catch(e => {
                console.log(e);
                });
    
                this.submitted = true;
                this.article = {};
            } else {
                const data = {
                    title: this.article.title,
                    content: this.article.content,
                    userId: localStorage.getItem("userId")
                }

                http
                .post("/articles", data)
                .then(response => {
                this.article.id = response.data.id;
                console.log(response.data);
                router.push("/page_principale");
                })
                .catch(e => {
                console.log(e);
                });
    
                this.submitted = true;
                this.article = {};
            }
            }
            
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