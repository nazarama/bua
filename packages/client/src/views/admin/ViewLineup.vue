<template lang="pug">
Form.admin_lineup_view() Add new dj/promoter
    .p-field
        PrimeLabel(for='') Name
        PrimeInputText#name(v-model="personInfo.name" required='true', autofocus='')
        small.p-error() Name is required.
    .p-field 
        PrimeLabel(for='') external link 
        PrimeTextArea#external_link(v-model="personInfo.external_link" required='true', rows='3', cols='100')    
    .p-field
        PrimeLabel(for='') short bio
        PrimeTextArea#description(v-model="personInfo.description" required='true', rows='30', cols='100')
p 
  | {{ personInfo }}
PrimeButton(label="save"  @click="savePerson" ) 
hr  

Form.admin_lineup_view() Create lineup 

    .p-field 
        PrimeLabel(for="") Choose event 

        PrimeDropDown(v-model="lineUpInfo.event" :options="state.resultListEvents" )
    .p-field
        PrimeLabel(for="") Choose artist

        PrimeMultiSelect(v-model="lineUpInfo.persons" :options="state.resultForPersons" optionLabel="name")

p 
  | {{ lineUpInfo }}
  PrimeButton(label="save"  @click="saveLineup" )   
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onBeforeUnmount } from "vue";
import LayoutDefault from "../../layouts/LayoutDefault.vue";
import state from "../../state";
import { FilterMatchMode } from "primevue/api";
import axios from "axios";
import ObjectID from "bson-objectid";



export default defineComponent({
    name: "AdminViewLineup",
    components: {
      LayoutDefault,
    },
    setup() {
      onMounted(async () => {
        await state.fetchPersons();
        //admin lineup
        await state.fetchEasyEvents();
      });

    const personInfo = ref({ name: null, external_link: null, description: null});
    const lineUpInfo = ref({event: null, persons:[null] });

    return {
        personInfo,
        lineUpInfo,
        state,
    }
},
methods: {
  getPerson(){},

  async savePerson(){
    const person = {
                name: this.personInfo.name,
                external_link: this.personInfo.external_link,
                description: this.personInfo.description,
            }

    const newPerson = await axios.post("/api/lineup/savePerson", {person})
  },

  async saveLineup() {
    const lineup = {
        event: this.lineUpInfo.event.id,
        persons: this.lineUpInfo.persons.map((person: { id: any; }) => person.id), // Only include IDs
    };
    console.log("xxxx",lineup);
    try {
        const newLineup = await axios.post("/api/lineup/saveLineup", { lineup });
        // Handle successful response
    } catch (error) {
        // Handle error
    }
}

}})

</script>

<style scoped>

.admin_lineup_view {
  padding-top: 5rem;
  padding-bottom: 1.5rem;
  padding-left: 3rem;
  padding-right: 4rem;
}

</style>