<template lang="pug">
div    
    //- .screen_event
    //-     section.container 
    //-         .container.left
    //-             .text-container 
    //-                 //- .name &#9679; {{ state.event.name}}
    //-                 .name {{ state.event.name}}
    //-                 .description.wide-text-content {{ state.event.desc}}
    //-                 a(:href="state.event.fb" target="_blank") 
    //-                   img.icon(src='../assets/fb_white.png' alt='bratislava resident advisor' style="width:50px;")          
.screen_event  
  section.econtainer 
    //-.center-text.ename {{ state.event.name}}    
      //- .corner.bottom-right {{ state.event.desc}}
      //- .corner.top-right SUBDECK
      //- .corner.top-left 12.12.1222
      //- .corner.bottom-left Elena Colombi
      //-                 p BBK 
      //-                 p Nada 
      //-                 p DJ2
    img.eimage(:src="state.event.flyer")  
    //- .description.wide-text-content {{ state.event.desc}}
    //- a(:href="state.event.fb" target="_blank") 
    //-   img.icon(src='../assets/fb_white.png' alt='bratislava resident advisor' style="width:50px;")    
    //- img.image(:src="state.event.flyer")    

</template>
  
  <script lang="ts">
  import axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue';
import state from '../state';
  
  export default defineComponent({
    components: {
    state,
  },
    name: 'EventView',
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
      state,eventInfo
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
  color:  #949494;
  text-align: center;
  /* font-family: AlternateGothicProCyrillic; */
}

.econtainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top:5pc;
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
    color:  #afafaf;
    font-size: 2vw;
}
</style>

