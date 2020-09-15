<!-- component to show the preview of an article in a box -->
<template>
    <div class="preview m-3 p-2">
        <!-- header of the preview -->
        <div class="preview-header">
            <!-- left part of the header -->
            <div class="articleInfo">
                <!-- article title with link to article full page -->
                <router-link :to="{
                            name: 'articlePage',
                            params: { id: articleId }
                        }">
                    <p class="mb-0 link"> {{title}} </p>
                </router-link>
                <!-- article author with link to their user activity page -->
                <router-link :to="{
                                name: 'userActivity',
                                params: { id: userId }
                            }">
                    <p class="link"> {{author}} </p>
                </router-link>
            </div>
            <!-- right part of the header: time of update -->
            <div class="updateTime">
                <p> {{updatedAt}} </p>
            </div>
        </div>
        
        <!-- main part of preview with content -->
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
    p{ // limit the content shown to 3 lines
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