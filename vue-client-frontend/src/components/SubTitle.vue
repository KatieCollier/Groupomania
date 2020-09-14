<template>
    <div class="subtitle col h3 p-2 pl-md-5">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Subtitle'
}
</script>

<style lang="scss">
@import "../_variables.scss";

    .subtitle{
        background-color: $pink;
        color: $red;
        font-weight: bold;
    }
</style>