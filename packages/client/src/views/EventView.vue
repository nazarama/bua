<template lang="pug">
div    
  .event_view
    .event_row
      .event_column
        img(:src="state.event.flyer" style="max-width:80%; height:auto;  object-fit: cover;")
      .event_column.second
          .event_name {{ state.event.name}}       
          p(v-for="l in state.resultLineup")
            p(v-for="n in l.persons")
             a.image-link(:href="n.external_link" target="_blank")
               div.big-text {{ n.name }}
               .hover-line
          a.image-link(v-if="state.event.fb" :href="state.event.fb" target="_blank" ) 
            img.icon(src='../assets/pngwing.com.png' alt='bratislava resident advisor' style="width:80px;")    
            .hover-line 
          a.image-link(v-if="state.event.ra" :href="state.event.ra" target="_blank") 
            img.icon(src='../assets/pngegg.png' alt='bratislava resident advisor' style="width:80px;")
            .hover-line      
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, ref, onBeforeUnmount } from "vue";
import state from "../state";

export default defineComponent({
  components: {
    state,
  },
  name: "EventView",
  props: {
    eventId: {
      type: String,
      required: true,
    },
    clubId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const img = ref();
    let eventName = ref();
    let eventInfo = ref([]);

    onMounted(async () => {
      await state.fetchEvent(props.clubId, props.eventId);
      eventInfo.value = state.resultForEvent;
    });
    return {
      // You need to return the ref,
      // or it will not work.
      state,
      eventInfo,
    };
  },
});
</script>
<style scoped>
.screen_event {
  top: 0;
  left: 0;
  /* width: 100vw;
  height: 100vh;
  display: flex; */
}

.ename {
  /* font-weight: 400; */
  font-size: 12vw;
  color: #949494;
  text-align: center;
  /* font-family: AlternateGothicProCyrillic; */
}

.econtainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 5pc;
}
/* .ncontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
} */

.eimage {
  height: 80vh;
}

@media (max-width: 768px) {
  .eimage {
    width: 80%; /* Set the width to 100% on smaller screens */
    height: 80%;
  }
}

.center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 30px 0; /* pridaný padding */
  box-sizing: border-box; /* aby padding nezväčšil veľkosť elementu */
}

.corner {
  position: absolute;
  padding: 5px;
}

.top-left {
  top: 0;
  left: 0;
  font-size: 2vw;
  padding-bottom: 20%;
  color: #949494;
}

.top-right {
  top: 0;
  right: 0;
  font-size: 3vw;
}

.bottom-left {
  /* bottom: 0; */
  left: 10;
  font-size: 1.5vw;
  color: #00c89b;
}

.bottom-right {
  bottom: 0;
  right: 0;
  color: #afafaf;
  font-size: 2vw;
}

/* Define a class for the large font size */
.big-text {
  font-size: 4rem; /* Adjust the size as needed */
  display: block !important;
  color: white;
}

/* Optional: Make the text responsive */
@media screen and (max-width: 600px) {
  .big-text {
    font-size: 3.1rem; /* Adjust the size for smaller screens */
    color: white;
  }
}

.event_view {
  padding-top: 5rem;
  padding-bottom: 1.5rem;
  padding-left: 3rem;
  padding-right: 4rem;
}

.event_row {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  justify-content: center; /* Center the items horizontally */
}

.event_column {
  flex: 3;
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
    width: 40%; /* Change width to 33.33% when screen width is 1200 pixels or more */
  }
}

.hover-line {
  position: absolute;
  bottom: 5%; /* Adjust as necessary to position the line vertically */
  left: 0;
  height: 10px; /* Thickness of the line */
  width: 0; /* Start with a width of 0 */
  background-color: #ff3d00; /* Line color, change as needed */
  transition: width 0.3s ease; /* Animation duration and type */
  z-index: 1; /* To make sure the line is on top of the image */
}
.image-link:hover .hover-line {
  width: 100%; /* Grow the line's width to 100% on hover */
}
.link:hover .hover-line {
  width: 100%; /* Grow the line's width to 100% on hover */
}
.second {
  padding-left: 5rem;

  @media screen and (min-width: 300px) {
    padding-left: 0%; /* Change width to 33.33% when screen width is 1200 pixels or more */
  }

  @media screen and (min-width: 768px) {
    padding-left: 0%; /* Change width to 50% when screen width is 768 pixels or more */
  }

  @media screen and (min-width: 1200px) {
    padding-left: 2rem; /* Change width to 33.33% when screen width is 1200 pixels or more */
  }
}

.event_name {
  color: #ff3d00;
  font-size: 5pc;
}
/* Optional: Make the text responsive */
@media screen and (max-width: 600px) {
  .event_name {
    font-size: 3.3rem;
  }
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
