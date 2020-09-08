<template>
  <div>
    <div class="container">
            <div class="form-group">
                <label for="file"> Choisissez une image: </label>
                <input type="file" name="uploadfile" @change="uploadFile">
            </div>

            <div class="message mb-2">
                {{message}}
            </div>

            <div class="text-center">
                <BaseButton :disabled="!uploadfile" @click="handleSubmit"> Chargez l'image </BaseButton>
            </div>
    </div>    
  </div>
</template>

<script>
import BaseButton from "../components/BaseButton"

import http from "../http-common"

export default {
    name: "uploadFiles",
    components: {
        BaseButton
    },
    data() {
        return {
            uploadfile: null,
            image: [],
            imageUrl: null,
            message: null
        };
    },
    methods: {
        uploadFile (event) {
            this.uploadfile = event.target.files
        },
        handleSubmit() {
          const formData = new FormData();
          for (const i of Object.keys(this.uploadfile)) {
            formData.append('uploadfile', this.uploadfile[i])
          }

          http
            .post("/uploadfile", formData)
            .then(response => {
                this.image = response.data
                this.imageUrl = this.image.file.filename
                localStorage.setItem("imageUrl", this.imageUrl)
                this.message = "Image téléchargée: " + this.image.file.originalname
                window.stop();
            })
            .catch(e => {
                console.log(e)
                this.message = "Erreur lors du chargement de l'image"
            })
        }  
    }

}
</script>

<style scoped lang="scss">
@import "../_variables.scss";

    .container {
    max-width: 600px;
    }
    button:disabled{
        opacity: 70%;
    }
    button:disabled:hover{
        background-color: $pink;
        border: 2px solid $red;
        color: $red;
        opacity: 70%;
    }
</style>