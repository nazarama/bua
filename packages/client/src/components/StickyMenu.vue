<template>
  <nav class="sticky-menu" :class="{ 'scrolled': isScrolled }">
    <ul>
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
      <li><a href="#">Link 3</a></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'StickyMenu',
  setup() {
    const isScrolled = ref(false);

    const handleScroll = () => {
      isScrolled.value = window.pageYOffset > 0;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return { isScrolled };
  },
});
</script>

<style scoped>
.sticky-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0);
  color: #000;
  transition: background-color 0.3s ease, font-size 0.3s ease;
}

.sticky-menu.scrolled {
  background-color: #f00;
  color: #fff;
  font-size: 1.2em;
}

.sticky-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.sticky-menu li {
  margin: 0 1em;
}

.sticky-menu a {
  text-decoration: none;
  color: inherit;
}
</style>  