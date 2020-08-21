<template>
    <div class="comment m-3 p-2">
        <p class="commentor mb-0"> {{commentor}} </p>
        <p> {{createdAt}} </p>
        <p> {{content}} </p>

        <ActionBar />
    </div>
</template>

<script>
import ActionBar from "../components/ActionBar"

export default {
  name: 'Comment',
  components: {
      ActionBar
  },
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