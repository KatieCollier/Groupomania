<script>
export default {
  name: 'BaseButton'
}
</script>

<template>
  <!-- This v-on="$listeners" is a way
  to assign events to an element in a component.
  Without it, Vue does not know where to listen
  for the events. -->
  <button v-on="$listeners" class="btn-lg">
    <slot></slot>
  </button>
</template>

<style lang="scss">
    button{
        background-color: #FFD7D7;
        border: 2px solid #FD2D01;
        border-radius: 10;
        color:#FD2D01;
        font-weight: bold;
    }
</style>
