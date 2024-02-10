<!--<template lang="pug">-->

<!--div-->
<!--    Button.p-button-rounded.p-button-danger.p-button-text.small(v-if="selectedDateRange" icon='pi pi-times'  @click="selectedDateRange = ''" )-->
<!--    b.filter {{selectedDateRange}}-->
<!--    Button.p-button-rounded.p-button-danger.p-button-text.small(v-if="selectedClub.name" icon='pi pi-times' @click="selectedClub = {}" )-->
<!--    b.filter {{selectedClub.name}}-->

<!--    Calendar(v-model="selectedDateRange" selectionMode="range" showIcon="true")-->
<!--    DropDown( v-model='selectedClub' :options='clubs' optionLabel='name' :filter='true'  :showclear='true')-->

<!--</template>-->

<!--<script lang="ts">-->
<!--import { watchEffect, defineComponent, computed, ref,reactive } from "vue";-->
<!--import state from "@/state/index";-->

<!--interface IQuery {-->
<!--  club: string;-->
<!--  dateRange: any;-->
<!--}-->


<!--export default defineComponent({-->
<!--  setup(props) {-->

<!--    const selectedClub = ref("");-->
<!--    const selectedDateRange = ref("");-->
<!--    const query: any = computed(() => {-->
<!--      return { club: selectedClub, dateRange: selectedDateRange };-->
<!--    });-->
<!--    state.fetchClubs();-->
<!--    watchEffect(() =>-->
<!--      state.updateQuery(selectedClub.value, selectedDateRange.value)-->
<!--    );-->
<!--    watchEffect(() => {-->
<!--      state.fetchEvents();-->
<!--    });-->

<!--    return { query, selectedClub, selectedDateRange };-->
<!--  },-->

<!--  name: "CFilter",-->
<!--  props: {-->
<!--    value: {-->
<!--      type: Object as () => string,-->
<!--      required: true,-->
<!--    },-->
<!--    clubs: {-->
<!--      type: Object as () => [],-->
<!--      required: true,-->
<!--    },-->
<!--  },-->
<!--  options: {},-->
<!--  computed: {},-->
<!--  methods: {-->
<!--    reset() {-->
<!--      this.selectedDateRange = "";-->
<!--      this.selectedClub = "";-->
<!--    },-->
<!--  },-->
<!--});-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--::v-deep .p-inputtext {-->
<!--  position: absolute;-->
<!--  visibility: hidden;-->
<!--}-->
<!--::v-deep .p-calendar-w-btn {-->
<!--  border: none;-->
<!--  background: #4d4d4d;-->
<!--}-->
<!--::v-deep-->
<!--  .p-calendar-w-btn-->
<!--  .p-datepicker-trigger-->
<!--  .p-inputwrapper-focus-->
<!--  .p-button.p-button-icon-only {-->
<!--  border: none;-->
<!--  background: #4d4d4d;-->
<!--}-->
<!--::v-deep .p-calendar-w-btn .p-datepicker-trigger.p-button span {-->
<!--  color: lime;-->
<!--}-->
<!--::v-deep .pi {-->
<!--  color: lime;-->
<!--}-->
<!--::v-deep .p-dropdown {-->
<!--  border: none;-->
<!--  color: lime;-->
<!--}-->
<!--::v-deep .p-input {-->
<!--  box-shadow: none;-->
<!--  border: none;-->
<!--}-->
<!--::v-deep .p-dropdown-trigger {-->
<!--  border: none;-->
<!--  background: #4d4d4d;-->
<!--}-->

<!--::v-deep .p-button.p-button-icon-only.p-button-rounded {-->
<!--  height: auto;-->
<!--  font-size: 10px;-->
<!--}-->
<!--.small {-->
<!--  font-size: 10px;-->
<!--}-->
<!--::v-deep .pi {-->
<!--  font-size: inherit;-->
<!--}-->

<!--.filter {-->
<!--  font-size: small;-->
<!--}-->
<!--/*div.c {*/-->
<!--/*    border: 1px solid lime;*/-->
<!--/*    left: auto;*/-->
<!--/*    right: auto;*/-->
<!--/*}*/-->
<!--</style>-->
