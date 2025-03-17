<template lang="pug">
.podcast-text  PODCAST

.screen_podcasts
  .horizontal-scroller-container
    .fade-left(v-show="showLeftFade")
    .horizontal-scroller(ref="scroller" @scroll="handleScroll")
      div.row(v-for="(row, rowIndex) in rowsData" :key="rowIndex")
        div.grid-item(v-for="podcast in row" :key="podcast.order")
          router-link.image-link(:to="{ name: 'Podcast', params: { order: podcast.order } }")
            img.podcast_img(:src="'data:image/jpg;base64,' + podcast.podcastimage.data")
            p(style="color:#FFFFFb; text-decoration: none; font-family: monospace;")
              | {{podcast.order}}. {{podcast.name}}
            .hover-line
    .fade-right(v-show="showRightFade")
  PrimeProgressSpinner(
    v-if="loadingDelay"
    style="width: 150px; height: 150px; position: absolute; z-index: 9999;"
    strokeWidth="2"
    animationDuration=".8s"
  )
  </template>

<script lang="ts">
import { ref, defineComponent, onMounted, onBeforeUnmount, watch, computed } from "vue";
import state from "../state";

export default defineComponent({
  setup() {
    const rows = ref(0);
    const first = ref(0);
    const loading = ref(true);
    const loadingDelay = ref(true);
    const screenSize = ref({ width: window.innerWidth, height: window.innerHeight });
    const showLeftFade = ref(false);
    const showRightFade = ref(true); // Initially true since content starts at the leftmost

    const updateScreenSize = () => {
      screenSize.value = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    const findRows = (size: { width: number; height: number }) => {
      first.value = 0;
      if (size.width > 1000) rows.value = 12;
      if (size.width < 600) rows.value = 8;
      if (size.width < 400) rows.value = 6;
    };

    const rowsData = computed(() => {
      const podcasts = state.resultForPodcastsPage || [];
      const half = Math.ceil(podcasts.length / 2); // Split into 2 rows
      return [podcasts.slice(0, half), podcasts.slice(half)];
    });

    const handleScroll = (event: Event) => {
      const scroller = event.target as HTMLElement;
      const scrollLeft = scroller.scrollLeft;
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

      showLeftFade.value = scrollLeft > 0; // Show left fade if not at the start
      showRightFade.value = scrollLeft < maxScrollLeft; // Show right fade if not at the end
    };

    onMounted(async () => {
      findRows(screenSize.value);
      await state.fetchPodcasts();
      await state.fetchPodcastsPage(first.value.toString(), rows.value.toString());
      loading.value = false;

      window.addEventListener("resize", updateScreenSize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateScreenSize);
    });

    watch(screenSize, (newSize) => {
      findRows(newSize);
    });

    watch(loading, (newValue) => {
      if (!newValue) {
        setTimeout(() => {
          loadingDelay.value = false;
        }, 500);
      }
    });

    return {
      state,
      rows,
      first,
      loading,
      loadingDelay,
      rowsData,
      showLeftFade,
      showRightFade,
      handleScroll,
    };
  },
});
</script>

<style lang="scss">
.screen_podcasts {
  padding-top: 10%;
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: #5a5a5a;
}

.horizontal-scroller-container {
  position: relative;
  padding-left: 10%;
  width: 90%; /* Make the scroller smaller */
  max-width: 2000px; /* Limit maximum width */
  margin: 0 auto; /* Center the scroller */
  overflow: hidden; /* Hide overflowing content */
  z-index: 0;
}

.horizontal-scroller {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-x: auto;
  padding: 16px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}

.row {
  display: flex;
  gap: 16px;
}

.grid-item {
  flex: 0 0 auto;
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;

  img.podcast_img {
    /* width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px; */
    width: 300px;
    height: 200px;
    -o-object-fit: cover;
    object-fit: cover;
  }
  p {
    color: #fff;
    margin-top: 8px;
    font-family: monospace;
    font-size: 14px;
  }
}

.image-link {
  position: relative;
  display: inline-block;
  overflow: hidden;
  text-decoration: none;
}

.hover-line {
  position: absolute;
  bottom: 50%;
  left: 0;
  height: 2px;
  width: 0;
  background-color: #00c89b;
  transition: width 0.3s ease;
}

.image-link:hover .hover-line {
  width: 100%;
}

.fade-left,
.fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50px;
  z-index: 1;
  pointer-events: none;
}

.fade-left {
  left: 0;
  background: linear-gradient(to right, rgba(90, 90, 90, 1), rgba(0, 0, 0, 0));
}

.fade-right {
  right: 0;
  background: linear-gradient(to left, rgba(90, 90, 90, 1), rgba(0, 0, 0, 0));
}

.podcast-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  position: absolute;
  font-size: 3vw; /* Adjust font size relative to viewport width */
  text-align: center;
  padding-top: 10%;
  color: #ebebeb;
  white-space: nowrap; /* Prevent wrapping of text */
  z-index: 1;
  padding-left: 8%;
  padding-right: 8%;
}

/* Adjustments for smaller screens */
@media (max-width: 768px) {
  .podcast-text {
    font-size: 2.5vw; /* Slightly larger font for smaller screens */
    padding-top: 10%; /* Adjust padding for better layout */
  }
}

@media (max-width: 480px) {
  .podcast-text {
    font-size: 4vw; /* Even larger font for very small screens */
    padding-top: 15%; /* Further adjustment for padding */
  }
}
</style>
