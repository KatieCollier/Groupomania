<!-- Component to show a preview of any activity type in a box: article or comment -->
<template>
    <div class="preview m-3 p-2">
        <!-- top line of box -->
        <div class="preview-header">
            <!-- Activity type ( Article or Comment on) -->
            <div class="articleInfo">
                <p> {{activityType}} </p>
                
            </div>
            <!-- Timme article or comment was updated at -->
            <div class="updateTime">
                <p> {{updatedAt}} </p>
            </div>
        </div>

        <!-- rows 2 & 3 of the box with important information on the activity -->
        <div class="activity-title">
            <!-- if the activity is a comment, create a link to its related article -->
            <router-link :to="{
                                name: 'articlePage',
                                params: { id: commentArticleId }
                            }">
                <p v-if="activityType === 'Comment on'" class="mb-0 link"> This article </p>
            </router-link>
            <!-- if the activity is an article, give its title with a link to the full article page -->
            <router-link :to="{
                                name: 'articlePage',
                                params: { id: articleId }
                            }">
                <p class="mb-0"> {{activityTitle}} </p>
            </router-link>
            <!-- give the name of the user that did the activity with a link to their user activity page -->
            <router-link :to="{
                                name: 'userActivity',
                                params: { id: userId }
                            }">
                <p> {{user}} </p>
            </router-link>
        </div>
        
        <!-- give a preview of the content of the activity -->
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
  p{ // limit the content shown to 3 lines
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>