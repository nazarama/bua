<template lang="pug">
button(:class="{ 'floating-button': true, 'is-visible': isVisible }")
    slot
    //- div
    //-     span First line of text
    //-     br
    //-     span Second line of text
</template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from "vue";
  
  export default defineComponent({
    name: "FloatingButton",
    setup() {
      const isVisible = ref(false);
  
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        isVisible.value = (scrollTop < 6000 && scrollTop > 2000);
      };
  
      onMounted(() => {
        window.addEventListener("scroll", handleScroll);
      });
  
      onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
      });
  
      return {
        isVisible,
      };
    },

  props: {
    club: {
      type: Object as () => string,
      required: false,
    },
    date: {
      type: Object as () => [],
      required: false,
    },
  },
  options: {},
    computed: {},
  });
  </script>
  
  <style lang="scss">
  $floating-button-size: 60px;
  $floating-button-color: #FEFDFF  ;
  $floating-button-bg-color:#FEFDFF    ;
  $floating-button-shadow: 0 1px 1px #545357;
  
  @mixin floating-button {
    position: fixed;
    right: 20px;
    width: $floating-button-size;
    height: $floating-button-size;
    border-radius: 50%;
    background-color: $floating-button-bg-color;
    color: $floating-button-color;
    box-shadow: $floating-button-shadow;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
  
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
  
    &:active {
      transform: scale(0.9);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
  }
  
  .floating-button {
    @include floating-button;
    bottom: -100px;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    z-index: 9999;
  
    &.is-visible {
      top: 42px;
      opacity: 1;
    }
  }
  </style>
  