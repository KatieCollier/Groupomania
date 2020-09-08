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
@import "../_variables.scss";

    button{
        background-color: $pink;
        border: 2px solid $red;
        border-radius: 10;
        color: $red;
        font-weight: bold;
    }
</style>