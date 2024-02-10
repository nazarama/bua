<!--"{ url: require(`../assets/clubs//${m.name}icon.png`)}"-->
<template lang="pug">
GMapMap(:center="{lat: center.lat, lng: center.lng}"
    :zoom="15"
    style="width: 100%; height: 85%; position: absolute" ref="myMapRef" :disableDefaultUI="true" :options="option")
    GMapMarker(
            :position="m.position"
            :clickable="true"
            :draggable="false"
            :icon="{ url: require(`../assets/clubs//${m.icon ? m.icon : 'UFO.png' }`)}"
            :key="index"
            v-for="(m, index) in markers"
            @click="openMarker(m.id)"
            @closeclick="openMarker(null)")
        GMapInfoWindow( :opened="openedMarkerID === m.id"
            :options="{pixelOffset: {width: 10, height: 0},maxWidth: 320,maxHeight: 320,}" ) 
            PrimeDataTable(v-if="m.event && m.event.length > 0" :value='m.event' :paginator="true" :rows="3"    paginatorTemplate="PrevPageLink  NextPageLink" class="p-datatable-sm"
                responsiveLayout="scroll"
          )
                PrimeColumn(field='name' )
                PrimeColumn
                    template(#body="slotProps")
                        span {{ new Date(slotProps.data.from).toLocaleDateString() }}
                PrimeColumn
                    template(#body="slotProps")
                      span 
                        a(:href='slotProps.data.fb')
                          img(:src="require(`../assets/FB.png`)" alt class="icon"  style="width:13px;height:13px;float:right")

            h(style="color: black; font-family: AlternateGothicProCyrillic; opacity:1") {{m.name}}

</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import moment from "moment";
//import * as fs from 'fs';

enum Color {
  Black,
  Silver,
}

function f(x: Color) {
  if (x === Color.Black) {
    return [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#212121",
          },
        ], 

      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#212121",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e",
          },
        ],
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#bdbdbd",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#181818",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1b1b1b",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#2c2c2c",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8a8a8a",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#373737",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#3c3c3c",
          },
        ],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
          {
            color: "#4e4e4e",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#3d3d3d",
          },
        ],
      },
    ];
  }

  if (x === Color.Silver) {
    return [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f5f5",
          },
        ],
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#f5f5f5",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#bdbdbd",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#eeeeee",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#e5e5e5",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#dadada",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e",
          },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          {
            color: "#e5e5e5",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#eeeeee",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#c9c9c9",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e",
          },
        ],
      },
    ];
  }
}
function fixDate(d: Date) {
    console.log("tu", d);
  return (
    moment(d).format("ddd") +
    "." +
    moment(d).format("DD") +
    " " +
    moment(d).format("MMM")
  );
}
interface IPosition {
  lat: number;
  lng: number;
}

export default defineComponent({
  name: "ClubsMap",
  props: {
    center: {
      type: Object as () => IPosition,
      required: true,
    },
    markers: {
      type: Object as () => [any],
      required: true,
    },
    color: {
      type: Object as () => Color,
      required: true,
    },
  },

  data: () => {
    return { openedMarkerID: 0 };
  },
  computed: {
    option(): any {
      return {
        mapTypeControl: false,
        scaleControl: false,
        disableDefaultUI: false,
        scrollwheel: false,
        styles: f(this.color),
        fullscreenControl: false,
      };
    },
    // makeIcon(club: string): any {
    //     const link: string = "'../assets/clubs"+club+"icon.png'";
    //     return  "{ url: require("+ link +")}"
    // }
  },
  methods: {
    openMarker(id: number) {
      console.log('id',id)
      if (this.openedMarkerID === id) {
        this.openedMarkerID = 0;
      } else {
        this.openedMarkerID = id;
      }
    },

    // MarkersCoordinates(p: any):any{
    //     console.log("this.markers.map((obj: any) => ({position: obj.club.coordinates}));", this.markers.map((obj: any) => ({position: obj.club.coordinates})));
    //     return this.markers.map((obj: any) => ({position: obj.club.coordinates}));
    // }
    makeIconLink(name: string): any {
      // "{ url: require('../assets/clubs/FUHAicon.png')}";
      const link: any =
        "../assets/clubs/" + name.replace(/\s/g, "") + "icon.png";
      // if (fs.exists(link)) {
      //   console.log("IKONA NEEXISTUJE");
      // }
      //console.log( { url: require(link)});
      //return  { url: require(link)};
      //console.log(link);
      return { url: require(link) };
    },
  },
});
</script>
<style lang="scss">
.gm-style .gm-style-iw-t::after {
  background: #545357;
  opacity: 0.7;
}

/*style the box*/
.gm-style .gm-style-iw {
  opacity: 0.7;
  background-color: #b8b8b8 !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 120px !important;
  padding-top: 10px;
  display: block !important;
}

/*style the p tag*/
.gm-style .gm-style-iw #google-popup p {
  padding: 10px;
}

/*style the arrow*/
.gm-style div div div div div div div div {
  background-color: #b8b8b8 !important;
  padding: 0;
  margin: 0;
  padding: 0;
  top: 0;
  font-size: 12px;
}

/*style the link*/
.gm-style div div div div div div div div a {
  font-weight: bold;
}
.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
    padding: 0;
}
.p-datatable .p-datatable-tbody > tr > td {
  background: #b8b8b8;
  color: black;
  border: none;
  padding: 0;
  font-family: AlternateGothicProCyrillic;
}

.p-datatable .p-datatable-thead > tr > th {
  border: none;
  padding: 0px;
}

.p-paginator {
  background: transparent;
}
.p-paginator .p-paginator-first, .p-paginator .p-paginator-prev, .p-paginator .p-paginator-next, .p-paginator .p-paginator-last {
    background-color: #00c89b;
    border: 0 none;
    color: #27262a;
    // color:  rgba(5, 5, 5, 0.6);
    min-width: 1rem;
    height: 1rem;
    margin: 0.143rem;
    transition: none;
    border-radius: 30%;
}

.gm-style .gm-style-iw-tc {
  filter: drop-shadow(0 4px 2px rgba(178,178,178,.4));
  left: 0;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  width: 25px;
  height: 0px;
}
</style>
<!--GMapMap(:center="{lat: 51.093048, lng: 6.842120}"-->
<!--:zoom="7"-->
<!--style="width: 100vw; height: 500px" ref="myMapRef" :disableDefaultUI="true" :options="options")-->
<!--GMapMarker(-->
<!--:position="m.position"-->
<!--:clickable="true"-->
<!--:draggable="true"-->
<!--:icon="'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png'"-->
<!--:key="index"-->
<!--v-for="(m, index) in markersClubs")-->

