<template>
    <div class="comment m-3 p-2">
        <p class="commentor mb-0"> {{commentor}} </p>
        <p> {{createdAt}} </p>
        <p> {{content}} </p>
    </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
      commentor: {
          type: String,
          required: true
      },
      content: {
          type: String,
          required: true
      },
      createdAt: {
          type: Date,
          required:true
      },
  },
}
</script>

<style lang="scss">
  .comment{
      border: black 2px solid;
  }
  .commentor{
      font-weight: bold;
  }
</style>