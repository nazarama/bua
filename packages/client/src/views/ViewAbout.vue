<template lang="pug">
div
.section-tittle ABOUT
.screen_about 
   div
     p .vaša predpojatá kultúrna polícia
</template>

<script lang="ts">
    export default  {
        name: "ViewAbout"
    }
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
.section-tittle {
padding: 20px 0 0px;
text-align: center;
color: #00c89b;
// opacity: 0.3;
// font-size:80pt;
font-size: 55px;
border: 10px solid #00c89b;
z-index: 1;
}

@media (max-width: 768px) {
  .section-tittle {
    font-size: 45px;
  }
}

@media (max-width: 400px) {
  .section-tittle {
    padding-top: 14%;
    font-size: 37px;
    border: 9px solid #00c89b;
  }
}


.screen_about {
//   position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 82vh;
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

</style>
