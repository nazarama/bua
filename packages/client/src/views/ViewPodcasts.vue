<template lang="pug">
.section-tittle PODCASTS  
  //- p row {{ rows }}
  //- p first {{ first }} 
  PrimePaginator(       
        :totalRecords="state.resultPodcastCount"
        :rows="rows"
        :first="first"
        :pageLinkSize="5"
        @update:first="onFirstChange"
        @update:rows="onRowsChange"
        @page="changePodcastsPage")
.screen_podcasts
  div.grid-container
      div.grid-item(v-if="!loading" v-for="podcast in state.resultForPodcastsPage")
        router-link.image-link(:to="{ name: 'Podcast', params: { order: podcast.order } }")
          img.podcast_img(:src="'data:image/jpg;base64,' + podcast.podcastimage.data" )
          p(style="color:#FFFFFb;text-decoration: none; font-family: monospace;") {{podcast.order}}. {{podcast.name}}  
          .hover-line
  PrimeProgressSpinner(v-if="loadingDelay" style="width: 150px; height: 150px; position:absolute; z-index:9999;",strokeWidth="2", animationDuration=".8s")
        
//- PrimePaginator(:rows="5", :totalRecords="12")

</template>

<script lang="ts">
//            Event(:name="e.eventName", :club="e.clubName" :icon="e.clubIcon", :flayer="e.flayer")
//p(v-for="e in this.state.resultForEvents")

import { computed, defineComponent, onMounted, watch, watchEffect } from "vue";
import state from "../state";

import About from "../views/ViewAbout.vue";
import { flatten } from "array-flatten";
import { defineAsyncComponent } from "vue";
import { clearScreenDown } from "readline";
import { ref, onBeforeUnmount } from "vue";
import { defaultsDeep } from "lodash";

export default defineComponent({
  components: {},

  setup() {
    onMounted(async () => {
      findRows(screenSize.value);
      await state.fetchPodcasts();
      await state.fetchPodcastsPage(first.value, rows.value);
      loading.value = false;
    });
    const rows = ref();
    const first = ref();
    const loading = ref(true);
    const loadingDelay = ref(true);

    // state.fetchPodcastsPage(first.value, rows.value);
    // watchEffect(() =>
    //   state.fetchPodcastsPage(first.value, rows.value)

    // );

    // Create a reactive ref to store the screen size
    const screenSize = ref({ width: window.innerWidth, height: window.innerHeight });

    // Function to update the screen size
    watch(screenSize, (newSize, oldSize) => {
      // Run your specific function here
      handleScreenSizeChange(newSize, oldSize);
      findRows(screenSize.value);
      state.runFetchPodcastPage(first.value, rows.value);
    });

    // watch(loading, (newValue, oldValue) => {
    //  if (newValue == false)  {
    //   setTimeout(() => {
    //     loadingDelay.value = false;
    //   }, 500);
    //  }
    // });

    const handleScreenSizeChange = (
      newSize: { width: number; height: number },
      oldSize: { width: number; height: number }
    ) => {
      // Your specific function logic here
      console.log("Screen size changed:", newSize);
    };

    const updateScreenSize = () => {
      screenSize.value = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    // Attach the updateScreenSize function to the window resize event
    onMounted(() => {
      window.addEventListener("resize", updateScreenSize);
    });

    // Remove the event listener when the component is unmounted
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateScreenSize);
    });

    // Your method that depends on the screen size
    const findRows = (size: { width: number; height: number }) => {
      first.value = 0;
      // Your logic based on the screen size
      if (size.width > 1000) {
        rows.value = 4;
      }
      if (size.width < 600) {
        rows.value = 2;
      }
      if (size.width < 400) {
        rows.value = 2;
      }
      console.log("tutu");
    };

    const onFirstChange = (value: number) => {
      first.value = value;
    };
    const onRowsChange = (value: number) => {
      loadingDelay.value = true;
      loading.value = true;
      state.runFetchPodcastPage(first.value, value.toString());
      loading.value = false;
    };
    const onPageChange = (value: number) => {
      console.log("page change", value);
    };

    watchEffect(() => {
      if (loading.value == false) {
        setTimeout(() => {
          loadingDelay.value = false;
        }, 500);
      }
    });

    return {
      // You need to return the ref,
      // or it will not work.
      state,
      screenSize,
      findRows,
      onFirstChange,
      onRowsChange,
      onPageChange,
      rows,
      first,
      loading,
      loadingDelay,
    };
  },
});
</script>

<style lang="scss">
.p-progress-spinner-circle {
  stroke: #00c89b !important;
}
.p-paginator {
  background-color: your-desired-background-color;

  // Other styling if needed
  // For example, changing text color
  color: your-desired-text-color;
}

.podcast_img {
  width: 300px; /* Set the desired width */
  height: 200px; /* Set the desired height */
  object-fit: cover; /* Optional: Preserve aspect ratio and cover the entire container */
}

.image-link {
  // border: 1px solid #ccc;
  position: relative;
  display: inline-block;
  overflow: hidden; /* Hide the overflow so the line won't be visible outside of the link's area */
  text-decoration: none;
}

.hover-line {
  position: absolute;
  bottom: 50%; /* Adjust as necessary to position the line vertically */
  left: 0;
  height: 30px; /* Thickness of the line */
  width: 0; /* Start with a width of 0 */
  background-color: #00c89b; /* Line color, change as needed */
  transition: width 0.3s ease; /* Animation duration and type */
  z-index: 1; /* To make sure the line is on top of the image */
}

.image-link:hover .hover-line {
  width: 100%; /* Grow the line's width to 100% on hover */
}

.section-header {
  color: #fefdff;
  font-size: 24px;
  font-weight: bold;
  padding-top: 30px;
  padding-bottom: 15px;
  // background:#00c89b;
  h2 {
    z-index: 0;
  }
}
.screen_podcasts {
  //   position: fixed;
  padding-top: 5%;
  // padding-left: 10%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  // align-items: center;
  width: 100vw;
  // height: 82vh;
  // background-color: #00c89b;
  font-size: small;
  p {
    //font-size: 15px;
    font-weight: unset;
  }
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding-right: 100px;
  padding-left: 100px;
  margin-right: auto;
  margin-left: auto;
}

.grid-item {
  // border: 1px solid #ccc;
  // padding: 16px;
  // background-color: #f5f5f5;
  // box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.grid-item:hover {
  // background-color: #e0e0e0;
}

/* Adjust column count based on screen widths using media queries */
@media screen and (max-width: 480px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
    padding: 0%;
  }
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1025px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
  /* For larger screens, the 'repeat(auto-fill, minmax(200px, 1fr))' from the base .grid-container rule will take over. */
}
</style>
