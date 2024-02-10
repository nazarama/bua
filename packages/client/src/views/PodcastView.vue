<template lang="pug">
.podcast_view
  .podcast_row
    .podcast_column
      img(:src="state.podcast.podcastImage" style="max-width:100%; height:auto;  object-fit: cover;")
    .podcast_column.second  
      p.white-text-content
        p.podcast_name {{ state.podcast.name}}
        div(v-html="state.podcast.mix")
        | {{ state.podcast.interview}}
</template>

  
<script lang="ts">
import axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue';
import state from '../state';

export default defineComponent({
  components: {
  state,
},
  name: 'PodcastView',
  props: {
    order: {
      type: String,
      required: true,
    }
  },

setup(props) {

  const img = ref();


  onMounted(async () => {
      await state.fetchPodcast(props.order);
  });

  return {
    // You need to return the ref,
    // or it will not work.
    state
  };
},
});
</script>

<style scoped>

.podcast_view {
  padding-top: 5rem;
  padding-bottom: 1.5rem;
  padding-left: 3rem;
  padding-right: 4rem;
}

.podcast_row {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  justify-content: center; /* Center the items horizontally */
}

.podcast_column {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  /* width: 100%; Set width to 100% initially */

  @media screen and (min-width: 300px) {
    flex: unset;
  }


  @media screen and (min-width: 768px) {
    width: 50%; /* Change width to 50% when screen width is 768 pixels or more */
  }

  @media screen and (min-width: 1200px) {
    width: 33.33%; /* Change width to 33.33% when screen width is 1200 pixels or more */
  }
}

.second {
    padding-left:5rem;


  @media screen and (min-width: 300px) {
    padding-left: 0%; /* Change width to 33.33% when screen width is 1200 pixels or more */
  }

    @media screen and (min-width: 768px) {
    padding-left: 0%; /* Change width to 50% when screen width is 768 pixels or more */
   }

  @media screen and (min-width: 1200px) {
    padding-left: 5rem; /* Change width to 33.33% when screen width is 1200 pixels or more */
  }
  }

.podcast_name {
  color: #ff3d00;
  font-size: 3pc;
}

.white-text-content {
  white-space: pre-wrap;
  font-family: monospace;
  padding: 10px;

  @media screen and (min-width: 300px) {
    padding-left: 0%; /* Change width to 33.33% when screen width is 1200 pixels or more */
    border: 0px;
  }

    @media screen and (min-width: 768px) {
    padding-left: 0%; /* Change width to 50% when screen width is 768 pixels or more */
    border: 1px solid #ddd;
   }

  @media screen and (min-width: 1200px) {
    padding-left: 1rem; /* Change width to 33.33% when screen width is 1200 pixels or more */
    border: 1px solid #ddd;
  }
}

</style>
