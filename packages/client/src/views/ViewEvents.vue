<template lang="pug">
//- span(class="pi sliders-h" style="float: right; margin-left: auto")
//-     CompFilter(:clubs="state.clubs" style="position: sticky;top: 0;")
//-div.section-header
//-h2(style="padding-top:0.5%")
.section-tittle EVENTS
.screen_events
  table
    tbody
      tr(v-for="e in state.resultForEvents")
       td(style="text-align:left; ")
          .article
            Suspense
              LocalEvent(
                :name="e.eventName[0]",
                :club="e.clubName",
                :icon="e.clubIcon",
                :from="e.dateFrom[0]",
                :to="e.dateTo[0]",
                :eventId="e.eventId[0]",
                :clubId="e._id",
                :imageId="e.imageId",
                :desc="e.description[0]",
                :fb="e.fb"
              )

</template>

<script lang="ts">
//            Event(:name="e.eventName", :club="e.clubName" :icon="e.clubIcon", :flayer="e.flayer")
//p(v-for="e in this.state.resultForEvents")

import { computed, defineComponent, onMounted, onUnmounted, watch } from "vue";
import state from "../state";

import { flatten } from "array-flatten";
import { defineAsyncComponent } from "vue";

const LocalEvent = defineAsyncComponent(() => import("../components/CompEvent.vue"));
export default defineComponent({
  components: {
    LocalEvent,
  },

  setup() {

    
    onMounted(async () => {
      if (state.resultForMap.length < 1) {
        await state.fetchEvents();
      }
    });

    return {
      // You need to return the ref,
      // or it will not work.
      state,
    };
  },
  beforeUnmount() {
    state.releaseEvent();
  },

  unmounted() {
  }
  
});
</script>

<style lang="scss" scoped>


.section-header {
  color: #FEFDFF;
  font-size: 24px;
  font-weight: bold;
  padding-top:30px; 
  padding-bottom: 5px;
  // background:#00c89b;
  h2 { z-index: 0;} 
}
.screen_events {
//   position: fixed;
  padding-top: 5%;
  padding-left: 10%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  // align-items: center;
  width: 100vw;
  height: 82vh;
  // background:#27262a;
  font-size: small;
  p {
    font-size: 24px;
    color: #545357;
  }
}
 $grid-columns: 6;
 $grid-gutter: 1px;

  @mixin make-grid() {
    display: flex;
    flex-wrap: wrap;
    margin: -#{$grid-gutter / 2};
  }

  @mixin make-column($columns) {
    flex: 0 0 #{percentage($columns / $grid-columns)};
    max-width: #{percentage($columns / $grid-columns)};
    padding: #{$grid-gutter / 2};
  }

  .grid {
    @include make-grid();
    
  }

  .col {
    @include make-column(15);

    @media (min-width: 576px) {
      @include make-column(15);
    }

    @media (min-width: 768px) {
      @include make-column(5);
    }

    @media (min-width: 992px) {
      @include make-column(5);
    }

    @media (min-width: 1200px) {
      @include make-column(5);
    }
  }
.article {
  //border: 1px solid #ccc;
  //box-shadow: 2px 2px 6px 0px  rgba(0,0,0,0.3);
  max-height: 100%;
}
.article img {
  max-width: 100%;
}
.text {
  padding: 0 20px 20px;
}
.text > button {
  background: #FEFDFF; 
  border: 0;
  color: white;
  padding: 10px;
  width: 100%;
}
.grid > article:nth-child(1) {
  grid-column: span 2;
}

::v-deep .p-scrollpanel-bar {
  background: lime;
}
::v-deep .p-scrollpanel-content {
  background:#FEFDFF ;
}
</style>
