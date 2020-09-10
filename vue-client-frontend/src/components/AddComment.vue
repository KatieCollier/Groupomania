<template>
    <div>
        <div class="form-group mb-5">
            <textarea
                class="p-2 col"
                type="text"
                id="content"
                required
                v-model="comment.content"
                placeholder="Commentez..."
            />
            <BaseButton @click="addComment" class="float-right"> Envoyer </BaseButton>
        </div>
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
            const data = {
                articleId: this.$route.params.id,
                userId: localStorage.getItem("userId"),
                content: this.comment.content
                
            }
            console.log("comment info", data)

            http
            .post("/comments", data)
            .then(response => {
                this.comment.id = response.data.id;
                console.log(response.data);
                this.$router.go()
                
            })
            .catch(e => {
                console.log(e);
            });

            this.comment = {};
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