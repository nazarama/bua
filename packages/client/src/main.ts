import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./state";
import 'primeflex/primeflex.css';

import PrimeVue from "primevue/config";
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Textarea  from "primevue/textarea";
import ScrollPanel from "primevue/scrollpanel";
import FileUpload from 'primevue/fileupload';
import Fieldset from 'primevue/fieldset';
import CheckBox  from 'primevue/checkbox';

import MultiSelect from 'primevue/multiselect';


import "primevue/resources/themes/md-dark-indigo/theme.css"       //theme
import "primevue/resources/primevue.min.css"                 //core css
import "primeicons/primeicons.css"                           //icons
import Calendar from 'primevue/calendar';
import {PrimeIcons} from 'primevue/api';
import Menubar from 'primevue/menubar';
import Menu from "primevue/menu";
import Dropdown from 'primevue/dropdown';
import Badge from 'primevue/badge';
import Divider from 'primevue/divider';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Toolbar from 'primevue/toolbar';
import TieredMenu from 'primevue/tieredmenu';
import OverlayPanel from 'primevue/overlaypanel';

import Toast from 'primevue/toast';
import Sidebar from 'primevue/sidebar';
import Paginator from 'primevue/paginator';



import VueGoogleMaps from '@fawmi/vue-google-maps'
import ClubsMap from "./components/ClubsMap.vue";
import CFilter from "./components/CompFilter.vue";
import floatingButton from "./components/floatingButton.vue";
import CompFilter from "./components/CompFilter.vue";
import StickyMenu from "./components/StickyMenu.vue";
import CompNavigation from "./components/CompNavigation.vue"
import CompGallery from "./components/CompGallery.vue"

import ProgressSpinner from 'primevue/progressspinner';
import Accordion from "primevue/accordion";
import AccordionTab from 'primevue/accordiontab';

import VirtualScroller from 'primevue/virtualscroller';

// AIzaSyBvLv4wX12wj7AixpSZaErrbm6HX-kleXw


// app.use(VueGoogleMaps, {
//     load: {
//         key: 'YOUR_API_KEY_COMES_HERE',
//     },
// }).mount('#app')
const app = createApp(App);
//app.use(store);
app.use(router);
app.use(PrimeVue);


app.use(VueGoogleMaps, {load: { key: 'AIzaSyBvLv4wX12wj7AixpSZaErrbm6HX-kleXw',}});

app.component("VirtualScroller", VirtualScroller);
app.component("PrimeProgressSpinner", ProgressSpinner);
app.component("PrimeFieldSet", Fieldset);
app.component("PrimeButton", Button);
app.component("PrimeDataTable", DataTable);
app.component("PrimeDropDown", Dropdown)
app.component("PrimeColumn", Column);
app.component("PrimeColumnGroup", ColumnGroup);
app.component("PrimeCard", Card);
app.component("PrimeMenubar", Menubar);
app.component("PrimePanel", Panel);
app.component("PrimeSplitter", Splitter);
app.component("PrimeSplitterPanel", SplitterPanel);
app.component("PrimeDivider", Divider);
app.component("PrimeInputText", InputText);
app.component("ClubsMap", ClubsMap);
app.component("CompFilter", CompFilter);
app.component("StickyMenu",StickyMenu);
app.component("floatingButton",floatingButton);
app.component("CompNavigation",CompNavigation);
app.component("CompGallery",CompGallery);
app.component("PrimeCalendar",Calendar);
app.component("PrimeCheckBox", CheckBox);
app.component("PrimeBadge", Badge);
app.component("PrimeDivider", Divider);
app.component("PrimeTabView", TabView);
app.component("PrimeTabPanel", TabPanel);
app.component("PrimeToolBar", Toolbar);
app.component("PrimeDialog",Dialog);
app.component("PrimeTextArea", Textarea);
app.component("PrimeScrollPanel", ScrollPanel);
app.component("PrimeOverlayPanel", OverlayPanel);
app.component("PrimeSideBar", Sidebar);
app.component("PrimeFileUpload", FileUpload);
app.component("PrimeToast", Toast);
app.component("PrimePaginator", Paginator);
app.component("PrimeAccordion", Accordion);
app.component("PrimeAccordionTab", AccordionTab);
app.component("PrimeMultiSelect", MultiSelect);
app.mount("#app");

