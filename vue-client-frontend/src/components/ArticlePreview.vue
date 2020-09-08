<template>
    <div class="preview m-3 p-2">
        <div class="preview-header">
            <div class="articleInfo">
                <router-link :to="{
                            name: 'articlePage',
                            params: { id: articleId }
                        }">
                    <p class="mb-0 link"> {{title}} </p>
                </router-link>
                <router-link :to="{
                                name: 'userActivity',
                                params: { id: userId }
                            }">
                    <p class="link"> {{author}} </p>
                </router-link>
            </div>
            <div class="updateTime">
                <p> {{updatedAt}} </p>
            </div>
        </div>
        
        <div class="content">
            <p> {{content}} </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ArticlePreview',
  props: {
      title: {
          type: String
      },
      author: {
          type: String
      },
      updatedAt: {
          type: Date
      },
      content: {
          type: String
      },
      articleId: {
          type: Number
      },
      userId: {
          type: Number
      }
  },
}
</script>

<style lang="scss">
@import "../_variables.scss";

.preview{
    width: 90%;
    border: black 2px solid;
    &-header{
         display: flex;
         flex-direction: row;
         justify-content: space-between;
    }
    .articleInfo{
        font-weight: bold;
    }
    p{
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        font-style: normal;
    }
    a:hover{
        color: $red;
    }
  }
</style>