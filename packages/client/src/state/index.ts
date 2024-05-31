import { reactive } from "vue";
import axios from "axios";
import _ from "lodash";
//import __ from "@lodash/fp//";
import { mdiMicrosoftAzure } from "@quasar/extras/mdi-v5";

function isEmpty(str: string) {
  return !str || str.length === 0;
}

function isBlank(str: string) {
  return !str || /^\s*$/.test(str);
}
function isObjectEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}
interface DateRange {
  from: string;
  to: string;
}
interface Image {
  src: string;
  caption?: string;
  date: Date | null;
}

export default reactive({
  query: {
    club: "",
    from: "",
    to: "",
  },
  selectedClub: {},
  selectedDateRange: { from: null, to: null },
  event: { club: null, desc: null, name: null, flyer: null, fb: null, ra: null },
  podcast: { name: null, interview: null, podcastImage: null },

  resultForMap: [],
  resultForEvents: [],
  resultForEvent: [],
  resultForPodcasts: [],
  resultForPodcastsPage: [],
  resultForPodcast: [],
  resultPodcastCount: {},
  resultForPersons: [],
  resultLineup: {},
  //needs for creating lineups
  resultListEvents: [],
  clubs: [],
  // data for admin mode
  adminResult: [],
  center: {},
  tops: [],
  isReady: false,

  resetDateRange() {
    this.selectedDateRange.value = {};
  },

  updateQuery(newClub: any, newDate: any | null) {
    this.query.club = newClub.name;
    if (newDate && newDate.value && newDate.value[0]) {
      this.query.from = newDate.value[0];
    } else {
      this.query.from = null;
    }
    if (newDate && newDate.value && newDate.value[1]) {
      this.query.to = newDate.value[1];
    } else {
      this.query.to = null;
    }

    this.fetchEvents();
    return this.query;
  },

  async fetchClubs() {
    this.clubs = (await axios.get<[]>("/api/club/clubs")).data;
  },
  async fetchAll() {
    const params: any = {};
    params.from = new Date(Date.now() - 86400000);
    params.to = new Date(new Date().getFullYear() + 2, 11, 31);
    this.adminResult = (await axios.get<[]>("/api/club/flatten", { params })).data;
    const pom: any = this.adminResult.filter((e: any) => e.top[0] === true);

    // if (pom.length>0)
    // {
    for (var i = 0; i < pom.length; i++) {
      let pomImage: Image = { src: "", caption: "", date: null };
      pomImage.src =
        "data:image/jpg;base64," +
        `${(await axios.get(`/api/image/${pom[i].topImage[0]}`)).data.data}`;
      pomImage.caption = pom[i].eventName[0];
      pomImage.date = pom[i].dateFrom[0];
      this.tops.push(pomImage);
      // tops[i].src = pom[i].topImage[0]; // output: Apple Orange Banana
      // tops[i].caption = pom[i].eventName;
    }
    // }
    // else {
    //   const pomImage: Image = { src: `..assets/denada.png` , caption: "DE NADA", date: new Date(Date.now())}
    //   this.tops.push(pomImage);
    // }

    this.isReady = true;

    // const image = axios.get(`/api/image/${this.imageId}`);
    // return "data:image/jpg;base64," + `${(await image).data.data}`;
  },

  async fetchEasyEvents() {
    try {
      this.resultListEvents = (await axios.get<[]>("/api/event", {})).data;
    } catch (e) {
      console.error("error", e);
    }
  },

  async fetchPersons() {
    try {
      this.resultForPersons = (await axios.get<[]>("/api/lineup/persons", {})).data;
    } catch (e) {
      console.error("error", e);
    }
  },

  async fetchPodcasts() {
    try {
      this.resultForPodcasts = (await axios.get<[]>("/api/podcast", {})).data;
      this.resultPodcastCount = this.resultForPodcasts.length;
    } catch (e) {
      console.error("error", e);
    }
  },

  async fetchPodcastsPage(skip: string, limit: string) {
    try {
      this.resultForPodcastsPage = (await axios.get<[]>(`/api/podcast/page/${skip}/${limit}`)).data;
    } catch (e) {
      console.error("error", e);
    }
  },

  runFetchPodcastPage(skip: string, limit: string) {
    this.fetchPodcastsPage(skip, limit);
  },

  async fetchPodcast(order: string) {
    try {
      this.resultForPodcast = (await axios.get<[]>(`/api/podcast/${order}`)).data;

      this.podcast.name = this.resultForPodcast.name;
      this.podcast.interview = this.resultForPodcast.interview;
      this.podcast.mix = this.resultForPodcast.mix;
      this.podcast.podcastImage =
        "data:image/jpg;base64," +
        `${(await axios.get(`/api/image/${this.resultForPodcast.podcastimage}`)).data.data}`;
    } catch (e) {
      console.error(e);
    }
  },

  async fetchEvents() {
    try {
      const params = this.buildQuery(this.query.from, this.query.to, this.query.club);
      this.resultForMap = (await axios.get<[]>("/api/club/filter", { params })).data;

      if (this.resultForMap.length === 0) {
        this.resultForMap = (await axios.get<[]>("/api/club/only")).data;
      }

      // find center of current markers
      if (this.resultForMap.length > 0) {
        const pom = this.resultForMap.map(({ position }: { position: string }) => ({ position }));
        const pom2 = pom.map((element: any) => ({
          lat: element.position.lat,
          lng: element.position.lng,
        }));
        this.center = this.findCenter(pom2);
      } else {
        this.center = { lat: 48.136933314107374, lng: 17.115584408777007 };
      }
      this.resultForEvents = (await axios.get<[]>("/api/club/flatten", { params })).data;
      // }
    } catch (e) {
      console.error("error", e);
    }
  },
  async fetchEvent(clubId: string, eventId: string) {
    try {
      this.resultForEvent = (await axios.get<[]>(`/api/club/${clubId}/${eventId}`)).data;
      this.event.name = this.resultForEvent[0].event[0].name;
      this.event.desc = this.resultForEvent[0].event[0].description;
      this.event.fb = this.resultForEvent[0].event[0].fb;
      this.event.ra = this.resultForEvent[0].event[0].ra;
      this.event.flyer =
        "data:image/jpg;base64," +
        `${(await axios.get(`/api/image/${this.resultForEvent[0].event[0].image}`)).data.data}`;

      this.resultLineup = await axios.get(`/api/lineup/${eventId}`);
    } catch (e) {
      console.error("error", e);
    }
  },

  releaseEvent() {
    this.resultForEvent = [];
    this.resultLineup = {};
    this.event = { club: null, desc: null, name: null, flyer: null, fb: null, ra: null };
  },
  //TODO dotypuj to
  async addEvent(event: any) {
    await axios.put("/api/event", { event });
    await axios.put;
  },
  buildQuery(from: any, to: any, club: string): any {
    const params: any = {};
    if (isEmpty(from) && isEmpty(to)) {
      params.from = new Date(Date.now() - 86400000);
      params.to = new Date(new Date().getFullYear() + 2, 11, 31);
    }
    if (!isEmpty(club)) {
      params.club = club;
    }
    if (!isEmpty(from) && !isEmpty(to) && !isEmpty(club)) {
      params.from = from;
      params.to = to;
      params.club = club;
    }
    if (!isEmpty(from) && !isEmpty(to) && isEmpty(club)) {
      params.from = from;
      params.to = to;
    }
    return params;
  },

  isActive(): boolean {
    return !isEmpty(this.query.club);
  },
  findCenter(markers: any) {
    const lats = markers.map((m: any) => m.lat);
    const lngs = markers.map((m: any) => m.lng);
    return {
      lat: (Math.min(...lats) + Math.max(...lats)) / 2,
      lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
    };
  },
});
