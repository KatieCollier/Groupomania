<!-- component to show a comment preview in the all activtity page -->
<template>
    <div class="preview m-3 p-2">
        <div class="preview-header">
            <!-- first line of header -->
            <div class="articleInfo">
                <p> Comment on </p>
                
            </div>
            <div class="updateTime">
                <p> {{updatedAt}} </p>
            </div>
        </div>

        <!-- important information on the comment -->
        <div class="activity-title">
            <!-- link to the related article -->
            <router-link :to="{
                                name: 'articlePage',
                                params: { id: commentArticleId }
                            }">
                <p class="mb-0 link"> This article </p>
            </router-link>
            <!-- author of the comment and link to their user activity page -->
            <router-link :to="{
                                name: 'userActivity',
                                params: { id: userId }
                            }">
                <p> {{user}} </p>
            </router-link>
        </div>
        
        <!-- main section of the preview with the comment content -->
        <div class="content">
            <p> {{content}} </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ActivityPreview',
  props: {
      user: {
          type: String
      },
      activityType: {
          type: String
      },
      updatedAt: {
          type: Date
      },
      content: {
          type: String
      },
      activityTitle: {
          type: String
      },
      commentArticleId: {
          type: Number
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
  }
  .articleInfo{
      font-weight: bold;
      color: $red;
  }
  .activity-title{
      font-weight: bold;
  }
  .link{
      font-style: italic;
  }
  p{ //limit content displayed to 3 lines
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>