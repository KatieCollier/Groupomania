<!-- component to add a comment to an article -->
<template>
        <div class="form-group mb-5">
            <!-- text area in which to enter the comment -->
            <textarea
                class="mb-3 p-2 col"
                type="text"
                id="content"
                required
                v-model="comment.content"
                placeholder="Commentez..."
            />
            <BaseButton @click="addComment" class="float-right"> Envoyer </BaseButton>
        </div>
</template>

<script>
import BaseButton from "../components/BaseButton"

import http from "../http-common"

export default {
    name: "AddComment",
    components: {
        BaseButton
    },
    data() {
        return {
            comment: []
        }
    },
    methods: {
        addComment() {
            const data = { //create data to be sent in the request
                articleId: this.$route.params.id, //article is the one that is currently open
                userId: localStorage.getItem("userId"), //user is the one currently logged in 
                content: this.comment.content //content retrieved from the text area
                
            }

            http
            .post("/comments", data) //send post request
            .then(response => {
                this.comment.id = response.data.id;
                this.$router.go(); 
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style lang="scss">
    textarea{
        border: black 2px solid;
        box-shadow: none;
        height: 100px;
    } 
</style> 