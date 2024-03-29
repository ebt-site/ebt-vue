<template>
  <div class="ebt-nav-app">
    <div class="ebt-nav-app-title" @click="clickHome()">
      <img :src="imgUrl" class="ebt-nav-img" @click="clickHome()" ></img>
      <v-icon class="ml-2 mb-1">{{mdiHome}}</v-icon>
      <div class="ebt-nav-title">{{title}}</div>
    </div>
    <div class="ebt-nav-app-icons">
      <v-btn icon to="/suttas" class="ebt-icon-btn" >
        <v-icon dark>{{mdiMagnify}}</v-icon>
      </v-btn>
      <ebt-settings :js="js" 
        :monolingual="monolingual"
        :version="`version ${version}`"
      />
      <v-btn icon to="/wiki" class="ebt-icon-btn" >
        <v-icon dark>{{mdiWikipedia}}</v-icon>
      </v-btn>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import EbtSettings from './ebt-settings';
import {
  mdiHome,
  mdiMagnify,
  mdiWikipedia,
} from '@mdi/js';
import { 
  name, 
  version,
} from '@/package.json';
import { Tipitaka } from 'scv-esm';
const JS = {
  BilaraWeb: require('../src/bilara-web'),
  Tipitaka,
}

export default {
  components: {
    EbtSettings,
  },
  props: {
    version: {
      type: String,
      default: version,
    },
    home: {
      type: String,
      default: '/wiki/welcome',
    },
    monolingual : {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: "ebt-vue",
    },
    imgUrl: {
      type: String,
      default: "candle.png",
    },
  },
  data: function(){
    return {
      mdiMagnify,
      mdiWikipedia,
      mdiHome,
    };
  },
  async mounted() {
  },
  methods:{
    async clickHome() {
      let { home } = this;
      try {
        this.$route !== home && await this.$router.replace(home);
      } catch(e) {
        console.log(`clickHome`, home, e.message);
      }
    },
    clickPageTop() {
        let elt = document.getElementById("ebt-search-field");
        if (elt) {
          let refSearchAuto = elt.__vue__.$refs.refSearchAuto;
          let input = refSearchAuto.$refs.input;
          this.$nextTick(()=>{
            console.log(`ebt-app-bar.clickPageTop() scrollIntoView`, elt);
            elt.scrollIntoView({block: "center"});
            input.focus();
          });
        }
    },
    clickPageBottom() {
      let elt = document.getElementById("ebt-tipitaka");
      if (elt) {
        console.log(`ebt-app-bar.clickPageBottom() scrollIntoView`, elt);
        this.$nextTick(()=>{
          elt.scrollIntoView({block: "center"});
        });
      } else {
        console.log('ebt-app-bar.clickPageBottom() (ignored)');
      }
    },
    async clickCursor(cursor) {
      let { sutta, history, $store } = this;
      let { sutta_uid, lang } = cursor;
      let updateHistory = false;
      if (sutta_uid !== sutta.sutta_uid) {
          await $store.dispatch('ebt/loadSutta', {sutta_uid, lang, updateHistory});
      }
      let elt = document.getElementById(cursor.scid);
      if (elt) {
        console.log(`ebt-app-bar.clickCursor() scrollIntoView`, elt);
        elt.scrollIntoView({block: "center"});
      } else {
        console.log(`ebt-app-bar.clickCursor() scrollIntoView (elt?)`);
      }
    },
  },
  computed: {
    cursorLabel() {
      let { cursor } = this;
      if (!cursor) {
          return "...";
      }
      let { scid, lang } = cursor;
      return `${scid}/${lang}`;
    },
    cursor() {
      let { iCursor, history } = this.settings;
        return history[iCursor];
    },
    current() {
        let { history, sutta } = this;
        let { sutta_uid, lang } = sutta;
        let iCur = history.findIndex(h=>h.sutta_uid===sutta_uid && h.lang===lang);
        return history[iCur] || sutta;
    },
    settings() {
        return this.$store.state.ebt.settings;
    },
    sutta() {
        return this.$store.state.ebt.sutta;
    },
    history() {
      return this.settings.history;
    },
    js() { 
      return JS;
    },
  },
}
</script>
<style>
</style>
