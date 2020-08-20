<script>
export default {
  name: 'ActivityPreview',
  props: {
      user: {
          type: String,
          required: true
      },
      activityType: {
          type: String,
          required: true
      },
      createdAt: {
          type: Date,
          required:true
      },
      content: {
          type: String,
          required: true
      }
  },
}
</script>

<template>
    <div class="preview m-3 p-2">
        <div class="preview-header">
            <div class="articleInfo">
                <p class="mb-0"> {{user}} </p>
                <p> {{activityType}} </p>
            </div>
            <div class="creationTime">
                <p> {{createdAt}} </p>
            </div>
        </div>
        
        <div class="content">
            <p> {{content}} </p>
        </div>
    </div>
</template>

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
  }
  p{
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>