<!-- view for the creation of an article -->
<template>
    <div class="create-article">
        <CurrentUser class="mb-4" />

        <!-- title input box -->
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

            <!-- content input box -->
            <div class="form-group">
                <label for="content">Texte:</label>
                <textarea
                    type="text"
                    id="content"
                    required
                    v-model="article.content"
                    name="content" />
            </div>

            <!-- select an image input -->
            <div class="form-group">
                <label for="file"> Choisissez une image: </label>
                <input type="file" name="uploadfile" @change="uploadFile">
            </div>
        </div>

        <div class="text-center">
            <BaseButton class="col-6 col-sm-4 m-4" @click="addArticle"> Publier </BaseButton>
        </div>
        
        <ReturnButton />

        <Footer />
        
    </div>
</template>


<script>
//import components necessary for view
import CurrentUser from "../components/LargeCurrentUser"
import BaseButton from "../components/BaseButton"
import ReturnButton from "../components/ReturnButton"
import Footer from "../components/Footer"

import http from "../http-common"
import router from "../router"

export default {
    name: "createArticle",
    components: {
        CurrentUser,
        BaseButton,
        ReturnButton,
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
        uploadFile (event) { //function that defines the file to be uploaded when it is selected or changed
            this.uploadfile = event.target.files
        },
        addArticle() { //add article to the database
            if(this.uploadfile){ //if there is an image
                const formData = new FormData(); //create a formData object with relevent infornmation
                for (const i of Object.keys(this.uploadfile)) {
                    formData.append('uploadfile', this.uploadfile[i])
                }
                formData.append("title", this.article.title)
                formData.append("content", this.article.content)
                formData.append("userId", localStorage.getItem("userId"))

                http //post formData
                    .post("/articles", formData, {
                        headers: { //define the correct data type with the headers
                        'Content-Type': 'multipart/form-data',
                        }
                    })
                    .then(response => {
                        this.article.id = response.data.id;
                        router.push("/page_principale"); //redirect to main page
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else { //if no image is attached
                const data = { //define data from the input boxes
                    title: this.article.title,
                    content: this.article.content,
                    userId: localStorage.getItem("userId")
                }

                http //post data to database - default headers set in http-common are fine
                .post("/articles", data)
                .then(response => {
                    this.article.id = response.data.id;
                    router.push("/page_principale");
                })
                .catch(err => {
                    console.log(err);
                });
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