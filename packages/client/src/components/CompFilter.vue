<template lang="pug">
div(style="position:absolute; font-size:25pt;margin-left:1%; color:#00c89b") EVENTS filter
  PrimeCalendar(v-model="selectedDateRange.value" selectionMode="range" showIcon="true")
  PrimeDropDown( v-model='selectedClub' :options='clubs' optionLabel='name' :filter='true'  :showclear='true')
//-  floatingButton
  //- PrimeButton.p-button-rounded.p-button-danger.p-button-text.small(v-if="selectedDateRange.value" icon='pi pi-times'  @click="selectedDateRange.value=null" )
  //- b.filter {{ test(selectedDateRange.value) }}
  //- PrimeButton.p-button-rounded.p-button-danger.p-button-text.small(v-if="selectedClub.name" icon='pi pi-times' @click="selectedClub = null" )
  //- b.filter {{selectedClub.name}}


</template>

<script lang="ts">
import test from "node:test";
import { watchEffect, defineComponent, computed, ref, reactive } from "vue";
import state from "../state/index";

interface IQuery {
  club: string;
  dateRange: any;
}

interface DateRange {
  from: Date | null;
  to: Date | null;
}

const selectedClub = ref("");
const selectedDateRange = ref<DateRange>({
  from: null,
  to: null,
});

export default defineComponent({
  setup() {
    // const selectedClub = ref("");s
    // const selectedDateRange = ref("");

    const query: any = computed(() => {
      return {
        club: state.selectedClub,
        from: state.selectedDateRange.from,
        to: state.selectedDateRange.to,
      };
    });
    state.fetchClubs();
    watchEffect(() => state.updateQuery(selectedClub.value, selectedDateRange.value));

    // watchEffect(() => {
    //   state.fetchEvents();
    // });
    return { query, selectedClub, selectedDateRange };
  },

  name: "CompFilter",
  props: {
    value: {
      type: Object as () => string,
      required: true,
    },
    clubs: {
      type: Object as () => [],
      required: true,
    },
  },
  options: {},
  computed: {},
  methods: {
    reset() {
      this.selectedDateRange = "";
      this.selectedClub = "";
    },
    formatDate(dateString: { from: any; to: any }) {
      const date = [new Date(dateString.from), new Date(dateString.to)];
      // Then specify how you want your dates to be formatted
      return [
        new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(date[0]),
        new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(date[1]),
      ];
    },
    test(dd: any) {
      if (dd && dd[0]) {
      }
      return "";
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep(.p-calendar) {
  background-color: #00c89b;
  border: 0 none;
}
::v-deep(.p-inputtext) {
  position: absolute;
  visibility: hidden;
  background-color: #00c89b;
}

::v-deep(.p-calendar-w-btn) {
  border: none;
  background-color: #5a5a5a;
}

::v-deep(.p-calendar-w-btn .p-datepicker-trigger.p-button span) {
  background-color: #5a5a5a;
}
::v-deep(.pi) {
  color: #00c89b;
}
::v-deep(.p-datepicker-trigger.p-button) {
  // background-color: white;
}
::v-deep(.p-calendar) {
  background-color: #5a5a5a;
}
::v-deep(.p-dropdown-trigger) {
  border: none;
}
::v-deep(.p-input) {
  box-shadow: none;
  border: #5a5a5a;
}
::v-deep(.p-dropdown) {
  border: none;
  background-color: #5a5a5a;
}

::v-deep(.p-button.p-button-icon-only.p-button-rounded) {
  height: auto;
  font-size: 10px;
}
.small {
  font-size: 10px;
}
::v-deep(.pi) {
  font-size: inherit;
}

// .filter {
//   position: sticky;
//   font-size: small;
// }
// /*div.c {*/
// /*    border: 1px solid lime;*/
// /*    left: auto;*/
// /*    right: auto;*/
// /*}*/
</style>

<style>
.p-calendar {
  background-color: transparent;
}
.p-dropdown {
  background-color: transparent;
}
.pi {
  color: #00c89b;
}
.p-calendar-w-btn .p-datepicker-trigger.p-button span {
  color: #00c89b;
}
</style>
