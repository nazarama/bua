<template>
    <nav :class="['moving-sticky-menu', isSticky ? 'sticky' : '']" ref="menu">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isSticky: false,
        firstMenuHeight: 0,
      };
    },
    mounted() {
      this.firstMenuHeight = this.$refs.menu.parentNode.offsetHeight;
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        this.isSticky = window.scrollY >= this.firstMenuHeight;
      },
    },
    computed: {
      menuStyle() {
        return {
          top: `${this.isSticky ? 0 : this.firstMenuHeight}px`,
        };
      },
    },
  };
  </script>
  
  <style lang="scss">
  .moving-sticky-menu {
    // background: lime;
    // position: absolute;
    position: fixed;
    display: flex;
    background: lime;
    left: 0;
    width: 100%;
    transition: top 0.8s ease;
    /* other styling */
  }
  
  .moving-sticky-menu.sticky {
    top: 0;
  }
  </style>
  