<template lang="pug">
.fullscreen-gallery
  p.lime {{ currentImageIndex.value }} 
  .slider-container
      img(v-if="images.length===0" src="@/assets/denada_default.png"  :style="{opacity:1}")
      img(v-else v-for="(img, index) in images", :key="index", :src="img.src", :class="{ 'active': index === currentImageIndex }" :style="{ width: itemWidth + 'px', height: itemHeight + 'px' }")
      .text-overlay(v-if="showText")
        .caption
            .topleft(v-if="images.length>0")  {{ currentImageCaption }} 
            .topleftdefault(v-if="images.length===0" ) {{ currentImageCaption }}
            .topright(v-if="images.length>0") {{  fixDate(currentImageDate) }}
  //- .image-container(:ref="galleryContainer")
  //-   img(:src="currentImage" :style="{ width: itemWidth + 'px', height: itemHeight + 'px' }")
  //-   .text-overlay(v-if="showText")
  //-     p {{ currentImageCaption }}
  //- .navigation
  //-   PrimeButton.prev(@click="prevImage") 
  //-   PrimeButton.next(@click="nextImage") 
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watchEffect } from "vue";
import moment from "moment";

interface Image {
  src: string;
  caption?: string;
  date: Date | null;
}

export default defineComponent({
  name: "FullScreenGallery",
  props: {
    images: {
      type: Array as () => Image[],
      required: true,
    },
  },
  setup(props) {
    let autoplayInterval: number = 4000;
    const itemWidth = ref(0);
    const itemHeight = ref(0);
    const galleryContainer = ref<HTMLDivElement | null>(null);
    const loadDefault = () => {
      return props.images.length > 0 ? false : true;
    };
    const dont = ref(loadDefault());

    const currentImageIndex = ref(0);
    const showText = ref(false);
    const currentImage =
      props.images.length > 0 ? ref(props.images[currentImageIndex.value].src) : ref(0);
    const currentImageDate =
      props.images.length > 0 ? ref(props.images[currentImageIndex.value].date) : ref(0);
    const currentImageCaption =
      props.images.length > 0 ? ref(props.images[currentImageIndex.value].caption ?? "") : ref(0);

    const nextImage = () => {
      currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length;
    };

    const prevImage = () => {
      currentImageIndex.value =
        (currentImageIndex.value - 1 + props.images.length) % props.images.length;
    };

    const calculateItemSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const containerWidth = screenWidth; // galleryContainer.value?.offsetWidth ?? 0
      // const numItems = images.value.length
      itemWidth.value = containerWidth; /// numItems
      itemHeight.value = screenHeight; //itemWidth.value / 1.5 // assume aspect ratio of 3:2
    };
    onMounted(() => {
      window.addEventListener("resize", calculateItemSize);

      setInterval(() => {
        nextImage();
        if (currentImageIndex.value >= props.images.length || !loadDefault) {
          prevImage();
        }
      }, autoplayInterval);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", calculateItemSize);
    });

    watchEffect(() => {
      if (props.images.length > 0) {
        currentImage.value = props.images[currentImageIndex.value].src;
        currentImageCaption.value = props.images[currentImageIndex.value].caption ?? "";
        currentImageDate.value = props.images[currentImageIndex.value].date;
        showText.value = Boolean(currentImageCaption.value);
        calculateItemSize();
      } else {
        showText.value = true;
        currentImageCaption.value = "Bratislava undeground advisor";
      }
    });

    return {
      currentImage,
      currentImageCaption,
      currentImageIndex,
      currentImageDate,
      nextImage,
      prevImage,
      showText,
      itemHeight,
      itemWidth,
    };
  },

  methods: {
    fixDate(d: Date) {
      return moment(d).format("ddd") + "." + moment(d).format("DD") + " " + moment(d).format("MMM");
    },
  },
});
</script>

<style scoped lang="scss">
.text-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  // background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 10.5vw;
  padding: 0.5rem;
  padding-left: 17vw;
  padding-bottom: 5%;
}

@media (max-width: 768px) {
  .text-overlay {
    font-size: 13.5vw;
    padding-bottom: 20%;
  }
}

@media (max-width: 375px) {
  .text-overlay {
    font-size: 13.5vw;
    padding-bottom: 20%;
  }
}
.caption {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  font-size: 7.5vw;
}
@media (max-width: 375px) {
  .caption {
    font-size: 8.5vw;
  }
}
.topleft {
  order: 1;
}
.topleftdefault {
  order: 1;
  color: #00c89b;
}
.topright {
  order: 2;
  color: #00c89b;
  font-size: 4.5vw;
}
.slider-container {
  // position: relative;
  // height: 400px;
  // width: 100%;
  max-height: 100%;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;

    &.active {
      opacity: 1;
    }
  }
}
.fullscreen-gallery {
  //position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // z-index: 9999;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // background-color: rgba(0, 0, 0, 0.9);
}

/* .image-container {
  position: relative;
  max-width: 100%;
  max-height: 100%;
}

img {
  /* max-width: 100%;
  max-height: 100%;
  object-fit: contain; 
  width: 100vw;
  height: 100vh;
} */

.image-container {
  // toto je dobre
  // height: 100vh;
  // overflow-x: hidden;
  // overflow-y: hidden;
  max-height: 100%;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.navigation {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  z-index: 1;
}

button {
  font-size: 2rem;
}
</style>
