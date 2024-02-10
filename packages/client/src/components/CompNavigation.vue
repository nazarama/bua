<template lang="pug">
header(:class="{'scrolled-nav': scrolledNav}")
    nav
          a.branding(href="/")
              img.image(src='../assets/ufo_green.png' alt='bratislava resident advisor')
          //- ul.navigation(v-show='!mobile')
          .social
            ul.navigation(v-show='false')
                li
                    router-link.link(:to="{name: 'Home'}") Home
                li
                    router-link.link(:to="{name: 'Events'}") Events
                li
                    router-link.link(:to="{name: 'Podcasts'}") Podcasts
                li
                    router-link.link(:to="{name: 'About'}") About
            .icon
                i.far.fa-bars.hamburger(@click='toggleMobileNav' v-show='true' :class="{'icon-active' :mobileNav}") 
                  .hamburger-line.top
                  .hamburger-line.middle
                  .hamburger-line.bottom
            a(href='https://soundcloud.com/ba_underground', target='_blank', rel='noopener noreferrer')      
             .icon 
               img(src='../assets/sc_white.svg' style="z-index: 99;" alt='bratislava resident advisor')      
            transition(name='mobile-nav')
                ul.dropdown-nav(v-show='mobileNav')
                    li
                        router-link.link(:to="{name: 'Home'}" @click="mobileNav=false") Home 
                    li
                        router-link.link(:to="{name: 'Events'}"  @click="mobileNav=false") Events
                    li
                        router-link.link(:to="{name: 'Podcasts'}"  @click="mobileNav=false") Podcasts
                    li
                        router-link.link(:to="{name: 'About'}" @click="mobileNav=false") About



</template>
<script lang="ts">
        import { defineComponent } from "vue";
    
    
        export default defineComponent({
            name: "LayoutDefault",
            data() {
                const mobileNav = false;
                const scrolledNav = false;
                const mobile = false;
                const windowWidth: number = window.innerWidth;
                return {
                    scrolledNav,
                    mobile,
                    mobileNav,
                    windowWidth,
                };
            },
            created() {
                window.addEventListener("resize", this.checkScreen);
                this.checkScreen();
            },
            mounted() {
                window.addEventListener("scroll", this.updateScroll);
            },
            methods: {
                toggleMobileNav() {
                    this.mobileNav = !this.mobileNav;
                },
                updateScroll() {
                    const scrollPosition = window.scrollY;
                    if (scrollPosition > 50) {
                        this.scrolledNav = true;
                        return;
                    }
                    this.scrolledNav = false;
                },
    
                checkScreen() {
                    this.windowWidth = window.innerWidth;
                    if (this.windowWidth <= 750) {
                        this.mobile = true;
                        return;
                    }
                    this.mobile = false;
                    this.mobileNav = false;
                    return;
                },
            },
        });
    </script>
    
    <style lang="scss" scoped>


        header {
           // background-color: rgba(0, 0, 0, 0.2);
           // background-color: black;
            z-index: 99;
            width: 100%;
            position: fixed;
            transition: 0.5s ease all;
            color: #FEFDFF;
            height: 10%;
    
            nav {
                top: 10%;
                position: relative;
                display: flex;
                flex-direction: row;
                padding: 12px 0;
                transition: 0.5s ease all;
                width: 95%;
                margin: 0 auto;
                ////margin-left: 20pt;
                font-size: 44px !important;
                // padding: 15px 0 2% 50px;
                @media (min-width: 1640px) {
                    max-width: 1640px;
                }
    
                ul,
                .link {
                    font-weight: 500;
                    color: #FEFDFF;
                    list-style: none;
                    text-decoration: none;
                }
                li {
                    position: relative;
                    padding: 16px;
                    margin-left: 16px;
                    &::before {
                      content: "";
                      position: absolute;
                      left: 0;
                      top: 50%;
                      transform: translateY(-50%);
                      width: 8px;
                      height: 8px;
                      border-radius: 50%;
                      // background-color: #00c89b;
                      opacity: 0;
                      transition: opacity 0.3s ease-in-out;
                    }
                    &:hover::before {
                      opacity: 1;
                    }
                  }
    
                // li {
                //     text-transform: full-size-kana;
                //     padding: 16px;
                //     margin-left: 16px;
                // }
    
                // .link {
                //     font-size: 14px;
                //     transition: 0.5s ease all;
                //     padding-bottom: 4px;
                //     border-bottom: 1px solid transparent;
    
                //     &:hover {
                //         color: #FEFDFF;
                //         border-color: #00c89b;
                //     }
                // }
    
                .branding {
                    // display: flex;
                    // align-items: center;
                    position: absolute;
                    right: 0px;
                    top: 10px;
    
                    img {
                        width: 50px;
                        transition: 0.5s ease all;
                    }
                }

                .social {
                  font-size: 44px !important;
                  padding: 15px 0 10 15px;
                  position: absolute;
                  gap: 10pt;
                  display: flex;
                  // left: 50px;
                  top: 10px;

            }
    
                .navigation {
                    display: flex;
                    // align-items: center;
                    // flex: 1;
                    //  justify-content: flex-end;
                }
                .icon {
                    display: flex;
                    // position: absolute;
                    align-items: center;
                    top: 0;
                    height: 100%;
                    display: flex;
                    i {
                        cursor: pointer;
                        font-size: 24px;
                        transition: 0.8s ease all;
                    }
                }
    
                .icon-active {
                    transform: rotate(180deg);
                }
    
                .dropdown-nav {
                    z-index: 98;
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    width: 100%;
                    max-width: 300px;
                    height: 100%;
                    background-color: #00c89b;
                    top: 0;
                    left: 0;
                    // background-color: #f00;
                    // color: #fff;
                    padding-top: 10%;
                    font-size: 43px;
                    li {
                        margin-left: 0;
                        .link {
                            color: #27262a;
                        }
                    }
                }
    
                .mobile-nav-enter-active,
                .mobile-nav-leave-active {
                    transition: 0.5s ease all;
                }
    
                .mobile-nav-enter-from,
                .mobile-nav-leave-to {
                    transform: translateX(-250px);
                }
                .mobile-nav-enter-to {
                    transform: translateX(0);
                }
            }
        }
        .scrolled-nav {
            background-color: rgba(0, 0, 0, 0.8);  //opacity once scroll down
            //background-color: rgba(0, 47, 255, 1); 
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
            nav {
                padding: 8px 0;
    
                .branding {
                    img {
                        width: 30px;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                        0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    }
                }
            }
        }
    
    
        .LayoutDefault {
            max-width: 42em;
            margin-right: auto;
            margin-left: auto;
            padding-right: 1em;
            padding-left: 1em;
    
            &__nav {
                padding-top: 1em;
                padding-bottom: 1em;
                border-bottom: 1px solid #c0c0c0;
            }
    
            &__user {
                float: right;
            }
    
            &__main {
                padding-top: 1.5em;
                padding-bottom: 2em;
            }
    
            &__footer {
                padding-top: 1em;
                padding-bottom: 1em;
                border-top: 1px solid #c0c0c0;
            }
        }

        .hamburger {
          z-index: 99;
          width: 45px;
          height: 35px;
          position: relative;
          cursor: pointer;
      }

      .hamburger-line {
          background-color: rgb(255, 254, 254); /* Line color */
          height: 4px;            /* Line thickness */
          width: 100%;
          position: absolute;
          left: 0;
      }

      .hamburger-line.top {
          top: 0;
      }

      .hamburger-line.middle {
          top: 50%;
          transform: translateY(-50%);
      }

      .hamburger-line.bottom {
          bottom: 0;
      }

      .hamburger.clicked .hamburger-line.top {
    transform: rotate(45deg) translateY(10px); /* 45 degrees to form the top half of X */
    top: 50%;
}

.hamburger.clicked .hamburger-line.middle {
    opacity: 0; /* Hide the middle line */
}

.hamburger.clicked .hamburger-line.bottom {
    transform: rotate(-45deg) translateY(-10px); /* -45 degrees to form the bottom half of X */
    bottom: 50%;
}

        .LayoutDefault {
            max-width: 42em;
            margin-right: auto;
            margin-left: auto;
            padding-right: 1em;
            padding-left: 1em;
    
            &__user {
                float: right;
            }
    
            &__main {
                padding-top: 4.5em;
                padding-bottom: 2em;
            }
    
            &__footer {
                padding-top: 1em;
                padding-bottom: 1em;
                border-top: 1px solid #c0c0c0;
            }
           
        
          }

    </style>
    

<!-- <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CompNavigation",
  data() {
    const mobileNav = false;
    const scrolledNav = false;
    const mobile = false;
    const windowWidth: number = window.innerWidth;
    return {
      scrolledNav,
      mobile,
      mobileNav,
      windowWidth,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    updateScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        this.scrolledNav = true;
        return;
      }
      this.scrolledNav = false;
    },

    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
  },
});
</script>

<style lang="scss" scoped>
header {
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: #ffffff;

  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: 0.5s ease all;
    width: 90%;
    margin: 0 auto;
    @media (min-width: 1140px) {
      max-width: 1140px;
    }

    ul,
    .link {
      font-weight: 500;
      color: white;
      list-style: none;
      text-decoration: none;
    }

    li {
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }

    .link {
      font-size: 14px;
      transition: 0.5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;

      &:hover {
        color: lime;
        border-color: lime;
      }
    }

    .branding {
      display: flex;
      align-items: center;

      img {
        width: 100px;
        transition: 0.5s ease all;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }
    .icon {
      display: flex;
      position: absolute;
      align-items: center;
      top: 0;
      right: 24px;
      height: 100%;

      i {
        cursor: pointer;
        font-size: 24px;
        transition: 0.8s ease all;
      }
    }

    .icon-active {
      transform: rotate(180deg);
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100%;
      background-color: lime;
      top: 0;
      left: 0;

      li {
        margin-left: 0;
        .link {
          color: black;
        }
      }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: 1s ease all;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
      transform: translateX(-250px);
    }
    .mobile-nav-enter-to {
      transform: translateX(0);
    }
  }
}
.scrolled-nav {
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  nav {
    padding: 3px 0;

    .branding {
      img {
        width: 80px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
    }
  }
}
</style> -->
