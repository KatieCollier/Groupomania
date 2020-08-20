<script>
export default {
  name: 'Subtitle'
}
</script>

<template>
    <div class="subtitle col h3 p-2">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .subtitle{
        background-color: #FFD7D7;
        color: #FD2D01;
        font-weight: bold;
    }
</style>