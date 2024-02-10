<template lang="pug">
LayoutDefault
    router-view
</template>

<script lang="ts">
import { ref } from 'vue'
import LayoutDefault from '../src/layouts/LayoutDefault.vue'
import navigation from '../src/components/CompNavigation.vue'

export default {
  name: 'app',

  components: {
    LayoutDefault,
    navigation
  },
  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}

</script>
  
  <style lang="scss">
  
  @font-face {
      font-family: "AlternateGotNo2D";
      src: local("AlternateGotNo2D"),   url('../src/assets/font/Alternate_Gothic/AlternateGotNo2D.ttf') format("truetype");
      font-family: "Kimoru";
      src: local("Kimoru"), url("../src/assets/font/kimoru-font/KIMORU.ttf");
  }
  
  html {
    background-color: #212121;
  }
  
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
  }
  
  .app {
    min-height: 100vh;
    position: relative;
    background-color: #f1f1f1;
  }
  .container {
    padding: 0 20px;
    max-width: 1140px;
    margin: 0 auto;
  }
  </style>
  

<!-- <template lang="pug">
LayoutDefault
  router-view
</template>
  
  <script lang="ts">
  import { ref } from 'vue'
  import LayoutDefault from './layouts/layzoutDefault.vue'
  // import navigation from '../src/components/CompNavigation.vue'
  
  export default {
    name: 'app',
  
    components: {
      LayoutDefault,
      // navigation
    },
    setup () {
      return {
        leftDrawerOpen: ref(false)
      }
    }
  }
  
  </script> -->

