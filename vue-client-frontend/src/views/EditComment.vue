<template>
    <div class="edit-comment">
        <LargeCurrentUser class="mb-4" />

        <ReturnButton />

        <div class="m-3">
            <div class="form-group">
                <label for="content">Commentaire:</label>
                <textarea class="comment-textarea"
                    type="text"
                    id="content"
                    required
                    v-model="comment.content"
                    name="content"                />
            </div>
        </div>

        <div class="text-center">
            <BaseButton class="col-6 col-sm-4 m-4" @click="updateComment"> Enregistrer </BaseButton>
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
    name: "editComment",
    components: {
        LargeCurrentUser,
        ReturnButton,
        BaseButton,
        Footer
    },
    props: ["comment"],
    methods: {
        retrieveOneComment() {
            http
             .get("/comments/" + this.$route.params.id)
             .then(response => {
                 this.comment = response.data
                 console.log(response.data)
             })
             .catch(e => {
                 console.log(e)
             })
        },
        updateComment(){
            const data = {
                content: this.comment.content,
                userId: this.comment.userId,
                articleId: this.comment.articleId
            }

            http
                .put("/comments/" + this.$route.params.id, data)
                .then(response => {
                    console.log(response.data)
                    router.go(-1);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    created() {
        this.retrieveOneComment();
    }
}
</script>

<style lang="scss">
@import "../_variables.scss";

    .edit-comment{
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
        .comment-textarea{
            height: 200px;
        }
    }
</style>