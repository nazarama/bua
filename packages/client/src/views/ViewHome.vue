<template lang="pug">  
div
  //- stickyEvents   
  section#zero
      PrimeProgressSpinner(v-if="loadingDelay" style="width: 150px; height: 150px; position:absolute; z-index:9999;   top: 45%; left: 45%;",strokeWidth="2", animationDuration=".8s")
      div(v-if="state.isReady") 
        CompGallery(:images="state.tops")   
  section#one(v-if="state.resultForEvents.length > 0") 
      ViewEvents
  section#two 
      //- h2.section-header EVENTS
      ViewPodcasts
  section#three(v-if="false")
      ViewAbout
  section#five
      //- h2.section-header US
      //- .p(style="   position:absolute; font-size: 70px; text-align: center; padding-top: 10%;z-index:2;color:  #5a5a5a;padding-left: 8%;")  MAP
      CompFilter(:clubs="state.clubs" style="z-index:9999; ;padding-top: 5%;padding-left: 8%;") 
      ClubsMap(:color="mapColor" :center="{lat: state.center.lat, lng: state.center.lng}" :markers="state.resultForMap")

footer.LayoutDefault__footer
    .row  
       .column(style="padding-left:2.5%;justify-content: left;") @2023 Bratislava Undeground ADVISOR, good stuff only!
       .column(style="padding-right:3%;justify-content: right;") Made by NAZARAMA   
</template>
<script lang="ts">
import state from "../state";
import { defineComponent, onMounted, reactive, watch, ref, watchEffect } from "vue";

import LayoutDefault from "../layouts/LayoutDefault.vue";
import ViewAbout from "../views/ViewAbout.vue";
import ViewEvents from "../views/ViewEvents.vue";
import ViewPodcasts from "../views/ViewPodcasts.vue";
import axios from "axios";

enum Color {
  Black,
  Silver,
}

interface IPosition {
  lat: number;
  lng: number;
}

interface iEvent {
  name?: string;
  date?: string;
}

interface iClub {
  name?: string;
  position?: IPosition;
  event?: iEvent[];
}

async function getImage(imageId: string) {
  const image = axios.get(`/api/image/${imageId}`);
  return "data:image/jpg;base64," + `${(await image).data.data}`;
}

export default defineComponent({
  components: {
    LayoutDefault,
    ViewAbout,
    ViewEvents,
    ViewPodcasts,
  },
  setup() {
    const items: any = [
      {
        label: "File",
        icon: "pi pi-fw pi-file",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-plus",
            items: [
              {
                label: "Bookmark",
                icon: "pi pi-fw pi-bookmark",
              },
              {
                label: "Video",
                icon: "pi pi-fw pi-video",
              },
            ],
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-trash",
          },
          {
            separator: true,
          },
          {
            label: "Export",
            icon: "pi pi-fw pi-external-link",
          },
        ],
      },
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        items: [
          {
            label: "Left",
            icon: "pi pi-fw pi-align-left",
          },
          {
            label: "Right",
            icon: "pi pi-fw pi-align-right",
          },
          {
            label: "Center",
            icon: "pi pi-fw pi-align-center",
          },
          {
            label: "Justify",
            icon: "pi pi-fw pi-align-justify",
          },
        ],
      },
      {
        label: "Users",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-user-plus",
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-user-minus",
          },
          {
            label: "Search",
            icon: "pi pi-fw pi-users",
            items: [
              {
                label: "Filter",
                icon: "pi pi-fw pi-filter",
                items: [
                  {
                    label: "Print",
                    icon: "pi pi-fw pi-print",
                  },
                ],
              },
              {
                icon: "pi pi-fw pi-bars",
                label: "List",
              },
            ],
          },
        ],
      },
      {
        label: "Events",
        icon: "pi pi-fw pi-calendar",
        items: [
          {
            label: "Edit",
            icon: "pi pi-fw pi-pencil",
            items: [
              {
                label: "Save",
                icon: "pi pi-fw pi-calendar-plus",
              },
              {
                label: "Delete",
                icon: "pi pi-fw pi-calendar-minus",
              },
            ],
          },
          {
            label: "Archieve",
            icon: "pi pi-fw pi-calendar-times",
            items: [
              {
                label: "Remove",
                icon: "pi pi-fw pi-calendar-minus",
              },
            ],
          },
        ],
      },
      {
        label: "Quit",
        icon: "pi pi-fw pi-power-off",
      },
    ];
    const mapColor: Color = Color.Silver;
    const loadingDelay = ref(true);
    onMounted(async () => {
      if (state.tops.length < 1) {
        await state.fetchAll();
      }
      if (state.resultForMap.length < 1) {
        await state.fetchEvents();
      }

      if (state.isReady == true) {
        setTimeout(() => {
          loadingDelay.value = false;
        }, 100);
      }
      // if (state.tops.length < 1 ) {
      //   await state.fetchAll();
      // }
    });

    watchEffect(() => {
      if (!state.isReady) {
        setTimeout(() => {
          loadingDelay.value = false;
        }, 1200);
      }
    });
    return {
      state,
      mapColor,
      items,
      loadingDelay,
    };
  },
});
</script>

<style lang="scss">
.p-menubar {
  float: right;
}
.p-menubar-start {
  box-sizing: border-box;
}
.p-menubar-custom {
  float: left;
}

div.c {
  float: right;
}

.lime {
  color: lime;
}
.grey {
  color: #545357;
}

section {
  height: 100vh;
  width: 100vw;
}

#zero {
  background: #5a5a5a;
}

#one {
  background: #5a5a5a;
  color: #00c89b;
  // padding-top: 60px;
  text-align: center;
}
#two {
  background: #5a5a5a;
  color: #ebebeb;
  // padding-top: 60px;
  text-align: center;
  font-size: 70px;
}
#three {
  background: #5a5a5a;
  color: #afafaf;

  // padding-top: 60px;
  text-align: center;
  font-size: 70px;
}
#four {
  background: #5a5a5a;
  // padding-top: 60px;
  text-align: center;
  font-size: 70px;
}
#five {
  background: black;
  color: #5a5a5a;
  // padding-top: 60px;
  text-align: center;
  font-size: 25px;
}

.sticky-div {
  position: sticky;
  bottom: 0;
  font-size: 30px;
  color: white;
  background-color: #3991bd;
}
.LayoutDefault__footer {
  // position: absolute;
  left: 0;
  width: 100%;
  background-color: black;
  color: #545357;
  font-size: xx-small;
}
.row {
  display: flex;
}

.column {
  flex: 1; /* Makes sure the columns take up equal width */
  height: 100px; /* Adjust based on your needs */
  // border: 1px solid black; /* For visual separation; can be removed */
  display: flex;
  align-items: center; /* Center content vertically */
}
</style>
-->
