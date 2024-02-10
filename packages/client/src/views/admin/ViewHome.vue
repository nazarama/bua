<template lang="pug">
//- TabView
//-     TabPanel(header='Clubs')
//-         | Content I
//-     TabPanel(header='Events')
//-         ToolBar.p-mb-4
//-             template(#start='')
//-                 Button.p-button-success.p-mr-2(label='New', icon='pi pi-plus', @click='' style="background-color: lime;")
//-                 Button.p-button-danger(label='Delete', icon='pi pi-trash', @click='' style="background-color: darkgrey")

//-         DataTable.p-datatable-sm(:value="state.adminResult"  stateStorage="session" stateKey="dt-state-demo-session" responsiveLayout="scroll")
//-             Column(field='clubName' header='Club', :sortable='true', style='min-width:12rem')
//-             Column(field='eventName' header='Event', :sortable='true', style='min-width:12rem')
//-                 template(#body="slotProps")
//-                     span {{ slotProps.data.eventName.join(' ')}}
//-             Column(field="promoter" header="Promoter", :sortable='true', style='min-width:12rem')
//-                 template(#body="slotProps")
//-                     span {{ slotProps.data.promoter.join(' ')}}
//-             Column(field="date" header="Date", :sortable='true', style='min-width:12rem')
//-                 template(#body="slotProps")
//-                     span {{ slotProps.data.date.join(' ')}}
//-             Column(field='active', header='Status', :sortable='true', style='min-width:12rem')
//-                 template(#body='slotProps')
//-                     span(:class="'product-badge status-'  + slotProps.data.active.join(' ')")
//-                     i.pi.pi-check(v-if="slotProps.data.active.join(' ') === 'true'")
//-                     i.pi.pi-circle-fill(v-else)
//-             Column(:exportable='false', style='min-width:8rem')
//-                 template(#body='slotProps')
//-                     Button.p-button-rounded.p-button-success.p-mr-2(icon='pi pi-pencil', @click='' style="background-color: lime;")
//-                     Button.p-button-rounded.p-button-warning(icon='pi pi-trash', @click='' style="background-color: darkgrey")
//-             Column(:exportable="false")
//-                 template(#body="slotProps")



//-     TabPanel(header='Something' :disabled='true')
//-         | Content III
//-         PrimeButton(@clisk="display.value=true" style="z-index:99;") create event    {{display}}
<!--Dialog(v-model:visible="display")-->
<!--    template(#header='')-->
<!--        h3 Header-->
<!--    | &#x9;Content-->
<!--    template(#footer='')-->
<!--        button.p-button-text(label='No', icon='pi pi-times')-->
<!--        button(label='Yes', icon='pi pi-check', autofocus='')-->

PrimeDialog.p-fluid(v-model:visible='display', :style="{width: '450px'}", header='Event', :modal='true')
    .p-field
        PrimeLabel(for='') Name
        PrimeInputText#name(v-model.trim='eventInfo.name', required='true', autofocus='')
        small.p-error() Name is required.
    .p-field
        PrimeLabel(for='') Description
        PrimeTextArea#description(v-model='eventInfo.description', required='true', rows='3', cols='20')
    .p-field
        PrimeLabel(for='') FB link
        PrimeInputText#fblink(v-model='eventInfo.fb', required='true', autofocus='')
    .p-field
        PrimeLabel(for="") Club
        PrimeDropDown(v-model="eventInfo.club" :options="state.clubs" optionLabel="name")
    .p-field
        PrimeLabel(for="icon") From
        PrimeCalendar#icon(v-model="eventInfo.from", :showIcon="true")
        PrimeLabel(for="icon") To
        PrimeCalendar#icon(v-model="eventInfo.to", :showIcon="true")

    .p-field
        PrimeFileUpload(name='image',:customUpload="true" @uploader="uploadImage"  @select="onSelectEvent" :multiple='true', accept='image/*', :maxfilesize='1000000')
            template(#empty='')
                p Drag and drop files to here to upload
    .p-field
        p {{eventInfo}}
         img(:src="img")
    .p-field 
        PrimeCheckBox(inputId="binary", v-model="eventInfo.top", :binary="true")     

    .p-field
        PrimeFileUpload(v-if="eventInfo.top" name='image',:customUpload="true" @uploader="uploadImage"  @select="onSelectEvent" :multiple='false', accept='image/*', :maxfilesize='1000000')
          template(#empty='')
            p Drag and drop files to here to upload    


//- PrimeDialog.p-fluid(v-model:visible='display', :style="{width: '450px'}", header='PODCAST', :modal='true')
//-       .p-field
//-           PrimeLabel(for='') Dj/Promoter
//-           PrimeInputText#name(v-model.trim='podcastInfo.name', required='true', autofocus='')
//-           small.p-error() Name is required.
//-       .p-field 
//-          PrimeLabel(for='') Soundcloud 
//-          PrimeTextArea#mix(v-model='podcastInfo.mix', required='true', rows='30', cols='20')    
//-       .p-field
//-           PrimeLabel(for='') Interview
//-           PrimeTextArea#interview(v-model='podcastInfo.interview', required='true', rows='30', cols='20')
//-       //- .p-field
//-       //-     PrimeLabel(for='') FB link
//-       //-     PrimeInputText#fblink(v-model='eventInfo.fb', required='true', autofocus='')
//-       //- .p-field
//-       //-     PrimeLabel(for="") Club
//-       //-     PrimeDropDown(v-model="eventInfo.club" :options="state.clubs" optionLabel="name")
//-       //- .p-field
//-       //-     PrimeLabel(for="icon") From
//-       //-     PrimeCalendar#icon(v-model="eventInfo.from", :showIcon="true")
//-       //-     PrimeLabel(for="icon") To
//-       //-     PrimeCalendar#icon(v-model="eventInfo.to", :showIcon="true")

//-       .p-field
//-           PrimeFileUpload(name='image',:customUpload="true" @uploader="uploadPodcast"  @select="" :multiple='true', accept='image/*', :maxfilesize='1000000')
//-               template(#empty='')
//-                   p Drag and drop files to here to upload
//-       .p-field
//-           p {{podcastInfo}}
//-           img(:src="img")
//-       .p-field 
//-           PrimeLabel(for='') Order
//-           PrimeInputText#name(v-model.trim='podcastInfo.order', required='true', autofocus='')
//-           small.p-error() Order is required.
//-       .p-field 
//-           PrimeCheckBox(inputId="binary", v-model="eventInfo.top", :binary="true")     
//-       //- .p-field
//-       //-     PrimeFileUpload(v-if="eventInfo.top" name='image',:customUpload="true" @uploader="uploadImage"  @select="onSelectEvent" :multiple='false', accept='image/*', :maxfilesize='1000000')
//-       //-       template(#empty='')
//-       //-         p Drag and drop files to here to upload  


</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import LayoutDefault from "../../layouts/LayoutDefault.vue";
import state from "../../state";
import { FilterMatchMode } from "primevue/api";
import axios from "axios";
import ObjectID from "bson-objectid";


// as any)._.flatten();
export default defineComponent({
  name: "AdminViewHomeEvent",
  components: {
    LayoutDefault,
  },
  setup() {
    onMounted(async () => {
      await state.fetchClubs();
      if (state.adminResult.length < 1) {
        await state.fetchAll();
      }
    });

    //const image: any = axios.get("/api/image/62cd3dbadbf7ff0e8345b21b");
    const img = ref();

    const eventInfo = ref({ name: null, from: null, to: null, club: null, top: false, description: "", fb:"" });
    const podcastInfo = ref({ name: null, mix: null, interview: null, order: null})
    const display = true;
    const display2 = true;
    const showImage = false;
    const filters1 = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    return {
      state,
      filters1,
      display,
      display2,
      eventInfo,
      podcastInfo,
     // image,
      img,
      showImage,
    };
  },
  methods: {
    showInfo() {
      console.log({
        summary: "Info Message",
        detail: "Message Content",
        life: 3000,
      });
    },
    onSelectEvent(params: any) {
      // axios.post("/api/admin/upload",{params});
    },

    async uploadPodcast(file: any){
      const formData = new FormData();
      formData.append("file",file.files[0])
      const url = "/api/image/upload";
      const newId =  new ObjectID;
      console.log("CC");

      const fetchResponse = await fetch(`${url}/${newId}`,{
            method: "POST",
            headers: {
              // don't set Content-Type: multipart/form-data. It's set automatically by fetch (same things with axios)
            },
            body: formData

          });

    if(fetchResponse.status === 200) {
      console.log("ahoj", this.podcastInfo);
      const podcast = {
          name: this.podcastInfo.name,
          interview: this.podcastInfo.interview,
          order:this.podcastInfo.order,
          mix: this.podcastInfo.mix,
          podcastimage: newId,
          // fb: this.eventInfo.fb,
      }
      const newPodcast =  await axios.post("/api/podcast", { podcast });
    
        }
    },

    async uploadImage(file: any) {


      const formData = new FormData();
      formData.append("file", file.files[0]);

      const url = "/api/image/upload";
      const newId =  new ObjectID;
      const newId2 =  new ObjectID;

      const fetchResponse = await fetch(`${url}/${newId}`,{
            method: "POST",
            headers: {
              // don't set Content-Type: multipart/form-data. It's set automatically by fetch (same things with axios)
            },
            body: formData

          });

          // lamerina ale bude fungovat 
          if (this.eventInfo.top === true) {
            if (file.files.length =2 ) {
              const formData = new FormData();
                formData.append("file", file.files[1]);

                const url = "/api/image/upload";
                


                const fetchResponse = await fetch(`${url}/${newId2}`,{
                      method: "POST",
                      headers: {
                        // don't set Content-Type: multipart/form-data. It's set automatically by fetch (same things with axios)
                      },
                      body: formData

          });
            }

          }

       if(fetchResponse.status === 200) {
            const event = {
                name: this.eventInfo.name,
                from: this.eventInfo.from,
                to: this.eventInfo.to,
                club: this.eventInfo.club,
                active: true,
                image: newId,
                description: this.eventInfo.description,
                fb: this.eventInfo.fb,
                promoter: "admim",
                top: this.eventInfo.top,
                topimage:newId2
            }
          const newEvent =  await axios.post("/api/event", { event });
        
              if(newEvent.status === 200 ) {
                  const eventRegistration =  await axios.put(`/api/club/${(this.eventInfo.club as any).id}/${newEvent.data.id}`);
              }
           };


      // this.showImage = true;
      // const image = axios.get("/api/image/62b6db7fdc9b1ecfce5bb889");
      // this.img = "data:image/jpg;base64," + `${(await image).data.data}`;
    },


    myUploader(event: any) {
      axios.post("/api/admin/upload", { params: event });
      // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    },
    saveEvent(data: any) {
      const event = {
        name: data.name,
        from: data.from,
        to: data.to,
        club: data.club,
        activate: true,
      };
    },
  },
});
</script>

<style scoped></style>
