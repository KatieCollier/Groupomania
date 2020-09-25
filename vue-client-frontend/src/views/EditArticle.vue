<!-- view to edit an existing article -->
<template>
    <div class="edit-article">
        <LargeCurrentUser class="mb-4" />

        <ReturnButton />

        <!-- title input box-->
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

            <!-- content input box-->
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

            <!-- imape upload input -->
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
//import components used in view
import LargeCurrentUser from "../components/LargeCurrentUser"
import ReturnButton from "../components/ReturnButton"
import BaseButton from "../components/BaseButton"
import Footer from "../components/Footer"

import http from '../http-common'
import router from "../router"
import jwtDecode from "jwt-decode"

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
        retrieveOneArticle() { //get the information on the article to edit
            http
             .get("/articles/" + this.$route.params.id)
             .then(response => {
                 this.article = response.data
             })
             .catch(err => {
                 console.log(err)
             })
        },
        uploadFile (event) { // define the file to be uploaded when it is selected or changed
            this.uploadfile = event.target.files
        },
        updateArticle(){ //update the article
            const decoded = jwtDecode(localStorage.getItem("token"))
            const userId = decoded.userId

            if(this.uploadfile){ //if an image is attached to the update
                const formData = new FormData(); //define a formData object
                for (const i of Object.keys(this.uploadfile)) {
                    formData.append('uploadfile', this.uploadfile[i])
                }
                formData.append("title", this.article.title)
                formData.append("content", this.article.content)
                formData.append("userId", userId)

                http //and use it to modify the article with put
                    .put("/articles/" + this.$route.params.id, formData, {
                        headers: { //header indication the correct data type
                            'Content-Type': 'multipart/form-data',
                        }
                    })
                    .then(() => {
                        router.go(-1);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else { //if there is no image attached
                const data = { //define the data using the input boxes
                    title: this.article.title,
                    content: this.article.content,
                    userId: userId
                }

                http //and put it to the database
                    .put("/articles/" + this.$route.params.id, data)
                    .then(() => {
                        router.push("/articles/" + this.$route.params.id);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }      
    },
    created() { //call functions need at the creation of the page
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