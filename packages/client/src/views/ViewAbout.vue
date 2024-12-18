<template lang="pug">
div
 .about-text  ABOUT

.screen_about 
   div
     p We’re a bunch of people with open hearts for music. This website grows with us.
     p It is kinda like our way of saying a big f*** you to Facebook and all that similar wrong algoritmuses. 
</template>

<script lang="ts">
export default {
  name: "ViewAbout",
};
</script>

<style lang="scss">
// .section-header {
//   color: #FEFDFF;
//   font-size: 24px;
//   font-weight: bold;
//   padding-top:30px;
//   padding-bottom: 5px;
//   background:#00c89b;
//   h2 { z-index: 0;}
// }
.section-title {
  writing-mode: vertical-rl; /* Makes text vertical */
  text-orientation: upright; /* Ensures letters are not rotated */
  font-size: 40px; /* Adjust font size as needed */
  color: #00c89b;
  padding: 20px 0;
  position: absolute;
  left: 0;
  top: 20%;
  transform: translateX(-50%); /* Centers the vertical title relative to the left edge */
  z-index: 1;
  font-weight: bold;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 35px;
    top: 15%; /* Adjust position for smaller screens */
  }
}

@media (max-width: 400px) {
  .section-title {
    font-size: 30px;
    top: 10%; /* Further adjust for very small screens */
  }
}

.screen_about {
  //   position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: #27262a;

  p {
    text-align: center;
    color: #afafaf;
    font-size: 18px;
  }
}

.about-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  position: absolute;
  font-size: 3vw; /* Adjust font size relative to viewport width */
  text-align: center;
  padding-top: 7%;
  padding-left: 8%;
  padding-right: 8%;
  color: #ebebeb;
  white-space: nowrap; /* Prevent wrapping of text */
}

/* Adjustments for smaller screens */
@media (max-width: 768px) {
  .about-text {
    font-size: 6vw; /* Slightly larger font for smaller screens */
    padding-top: 10%; /* Adjust padding for better layout */
  }
}

@media (max-width: 480px) {
  .about-text {
    font-size: 8vw; /* Even larger font for very small screens */
    padding-top: 15%; /* Further adjustment for padding */
  }
}
</style>
