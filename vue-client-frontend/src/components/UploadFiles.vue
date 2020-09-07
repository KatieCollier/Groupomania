<template>
  <div>
    <div class="container">
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <input type="file" name="uploadfile" @change="uploadFile">
            </div>

            <div class="message mb-2">
                {{message}}
            </div>

            <div class="text-center">
                <BaseButton :disabled="!uploadfile"> Chargez l'image </BaseButton>
            </div>
        </form>
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
    .container {
    max-width: 600px;
    }
    button:disabled{
        opacity: 70%;
    }
</style>