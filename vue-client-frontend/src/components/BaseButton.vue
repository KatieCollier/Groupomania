<!-- component for most used button format in the app -->
<template>
  <!-- $listeners allows us to put any event we want on the button -->
  <button v-on="$listeners" class="btn-lg">
    <!-- slot means we can insert any text we want in this button -->
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