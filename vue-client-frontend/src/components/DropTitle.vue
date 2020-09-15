<!-- component for titles of drop down columns -->
<template>
    <!-- $listeners allows us to add any event we want to the component -->
    <div v-on="$listeners" class="drop-title h4 px-3">
        <slot></slot>
        <span> ▼ </span>
    </div>
</template>

<style lang="scss">
@import "../_variables.scss";

    .drop-title{
        background-color: $red;
        color: $pink;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>