<template>
    <div class="preview m-3 p-2">
        <div class="preview-header">
            <div class="articleInfo">
                <p> {{activityType}} </p>
                
            </div>
            <div class="updateTime">
                <p> {{updatedAt}} </p>
            </div>
        </div>

        <div class="activity-title">
            <router-link :to="{
                                name: 'articlePage',
                                params: { id: commentArticleId }
                            }">
                <p v-if="activityType === 'Comment on'" class="mb-0 link"> This article </p>
            </router-link>
            <router-link :to="{
                                name: 'articlePage',
                                params: { id: articleId }
                            }">
                <p class="mb-0"> {{activityTitle}} </p>
            </router-link>
            <router-link :to="{
                                name: 'userActivity',
                                params: { id: userId }
                            }">
                <p> {{user}} </p>
            </router-link>
        </div>
        
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
      color: #FD2D01;
  }
  .activity-title{
      font-weight: bold;
  }
  .link{
      font-style: italic;
  }
  p{
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>