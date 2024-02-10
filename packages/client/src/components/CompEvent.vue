<template lang="pug">  
div(style="display:block;")
  .caption 
    router-link.router-link(:to="{ name: 'Event', params: { eventId, clubId } }")
      text.name(@click="visibleFull=true") {{name}}
      | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      //- img.flayer(:src="require(`../assets/clubs/${icon ? icon : 'UFO.png'}`)" alt class="icon" style="float: inline-end;")
      text.club {{club}}
      | &nbsp;&nbsp;
      text.date {{fixDate(from)}}
      
//- div  
//-   //- img.img(@click="state.fetchEvent(clubId, eventId), visibleFull=true" :src="img"  style="width: 100%;")
//-   //- img.img(@click="clickOnEvent" :src="img"  style="width: 100%;")
//-   //- router-link(:to="{ name: 'Event', params: { eventId, clubId } }")
//-   //-     img.img(:src="img", alt="Awesome event" style="width: 100%;")
//-   img.flayer(:src="require(`../assets/clubs/${icon ? icon : 'UFO.png'}`)" alt class="icon" style="float: inline-end;")
//-   p
//-   router-link(:to="{ name: 'Event', params: { eventId, clubId } }")
//-     .caption
//-       text.club {{fixDate(from)}}
//-       text.club(style="float: inline-end;")  {{club}}
<!--img(:src="img"  style="width: 100%;")-->

<!--img.flayer(:src="img"  alt class="icon")-->
//- PrimeSideBar(v-model:visible="visibleFull" position="full" blockScroll="false" :baseZIndex="10000")
//-   section.container
//-     .container.left
//-        .text-container
//-           .name2 &#9679; {{ name}}
//-           .description.wide-text-content {{ desc }}

//-     .container.right.wide-screen-content     
//-         img.image(:src="img")
//-     a(:href="fb") 
//-       img(src='../assets/fb_white.png' alt='bratislava resident advisor' style="width:50px")    
</template>

<script lang="ts">
// img(:src="`../assets/clubs/${icon}`")
// img(src="../assets/clubs/SVK.png")
import {
  defineComponent,
  ref,
  watchEffect,
  onMounted,
  computed,
  onUpdated
} from "vue";
import moment from "moment";
//import { ClubModel } from "../../server/src/models/club";
import ClubsMap from "../components/ClubsMap.vue";
import state from "../state/index";
import axios from "axios";
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
export default defineComponent({
  components: {
    ClubsMap,
    state,
  },
  async setup(props) {
    const img = ref();
    onMounted(async () => {
      try {
        img.value =
          "data:image/jpg;base64," +
          `${(await axios.get(`/api/image/${props.imageId}`)).data.data}`;
      } catch (err) {
        console.error("chyba", err);
        // Handle error
      }
    });
    onUpdated(() => {
      // text content should be the same as current `count.value`
    });

    const op = ref();

    const visibleFull = ref(false);
    const selectedProduct = ref();
    const toggle = (event: any) => {
      op.value.toggle(event);
    };

    return { selectedProduct, toggle, visibleFull, state, img };
  },

  name: "CompEvent",
  props: {
    name: {
      type: Object as () => string,
      required: true,
    },
    club: {
      type: Object as () => string,
      required: true,
    },
    icon: {
      type: Object as () => string,
      required: true,
    },
    from: {
      type: Object as () => Date,
      required: true,
    },
    to: {
      type: Object as () => Date,
      required: true,
    },
    desc: {
      type: Object as () => String,
      required: true,
    },
    fb: {
      type: Object as () => String,
      required: false,
    },
    eventId: {
      type: Object as () => string,
      required: true,
    },
    clubId: {
      type: Object as () => string,
      required: true,
    },
    imageId: {
      type: Object as () => string,
      required: false,
    },
  },
  watch: {
    // It listens to the change in prop name
    imageId: function (val) {
 // print out when the name changes
    },
  },
  methods: {
    fixDate(d: Date) {
      return (
        "        " +
        moment(d).format("ddd") +
        "." +
        moment(d).format("DD") +
        " " +
        moment(d).format("MMM")
      );
    },
    loadData() {
      this.state.fetchEvent(this.clubId, this.eventId);
    },
    async loadImage() {
      const image = axios.get(`/api/image/${this.imageId}`);
      return "data:image/jpg;base64," + `${(await image).data.data}`;
    },
  },
});
</script>

<style scoped>

.router-link-exact-active,
.router-link-active,
.router-link {
    text-decoration: none;
}

  .caption {
    justify-content: space-between;
    padding-top: 5pt;
    font-size: 1vw;
  }
  .topleft {
    order: 1;
  }
  .topright {
    order: 2;
  }
section {
  height: 70vh;
  width: 80vw;
}
.name2 {
  /* font-weight: 400; */
  font-size: 3.5vw;
  color: #FEFDFF;
  /* font-family: AlternateGothicProCyrillic; */
  display: block;
  padding-bottom: 10pt;
}

.text-container {
  width: 100%;
}
.description {
  padding-right: 10pt;
  font-size: 1vw;
  color: #545357 ;
  display: block;
  white-space: pre-wrap;
  font-weight:80;
}
.name {
  /* font-weight: 400; */
  font-size: 5vw;
  color: #afafaf;
  /* font-family: AlternateGothicProCyrillic; */
}
.club {
  color:  #949494;
  /* font-weight: 600; */
  font-size: 3vw;
  /* font-family: AlternateGothicProCyrillic; */
}
.date {
  color: #5f5f5f;
  /* font-weight: 100; */
  font-size: 1vw;
  /* font-family: AlternateGothicProCyrillic; */
}

@media (max-width: 968px) {
  .name {
    font-size: 10vw;
  }
  .club {
    font-size: 3vw;
  }
  .date {
    font-size: 2vw;
  }
}
.flayer {
  /* width: 10%; */
}
.img {
  /* -webkit-filter: grayscale(100%);
  filter: grayscale(100%); */
  width: 200px; /* set a fixed width */
  height: 200px; /* set a fixed height */
  object-fit: cover; /* make sure the image covers the entire element */
  /* border: 5px solid #00c89b; */

}

.container {
  padding: 0pt;
  display: flex;
}


.container .left {
  width: 50%;
  background: #00c89b;
  position: relative;
}

.container .right {
  width: 50%;
  background: #00c89b;
}

/* @media (min-width: 576px) {
      @include make-column(3);
    }

    @media (min-width: 768px) {
      @include make-column(3);
    } */

@media screen and (min-width: 276px) {
  .image {
    width: 0%;
    
  }
  .caption {
    font-size: 2vw;
  }
}


@media screen and (min-width: 576px) {
  .image {
    width: 100%;
    object-fit: contain;
  }
  .caption {
    font-size: 1vw;
  }
}


@media screen and (min-width: 768px) {
  .image {
    width: 100%;
    object-fit: contain;
  }
  .caption {
    font-size: 1vw;
  }
}

@media screen and (min-width: 1024px) {
  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .caption {
    font-size: 1vw;
  }
}

@media (max-width: 767px) {
  .wide-screen-content {
    display: none;
  }
  .wide-text-content {
    font-size: 2vw;
  }
}


</style>

