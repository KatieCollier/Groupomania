<template>
  <button v-on="$listeners" class="btn-lg">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
}
</script>

<style lang="scss">
    button{
        background-color: #FFD7D7;
        border: 2px solid #FD2D01;
        border-radius: 10;
        color:#FD2D01;
        font-weight: bold;
    }
</style>