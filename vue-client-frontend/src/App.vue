<template>
  <div id="app">
    <header class="p-2 text-center"> 
      <img src="/images/icon-left-font-monochrome-black.png" alt="">
    </header>

    <div class="text-center font-italic h3 mb-4 mt-2">
      <p> Le Réseau Social </p>
    </div>

    <router-view />
    
  </div>
</template>

<style lang="scss"> 
  @import "./_variables.scss";

  header{
    background-color: $pink;
    height: 60px;
  }
  img{
    height:50px;
  }
  a{
    color: black;
    text-decoration: none;
  }
</style>