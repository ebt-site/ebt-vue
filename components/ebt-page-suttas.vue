<template>
  <v-sheet light class="desktop" >
    <div class="desktop-search">
      <ebt-search-field :js="js"
        v-on:search-text="search"
      />
      <ebt-results :js="js"/>
    </div>
    <ebt-sutta :js="js" />
    <v-bottom-navigation app dark 
      height="var(--ebt-bottom-navigation-height)"
      >
      <ebt-cursor :js="js"/>
    </v-bottom-navigation>
  </v-sheet>
</template>

<script>
import Vue from 'vue';
import { EbtVue } from './vue-index';
import EbtSearchField from './ebt-search-field';
import EbtResults from './ebt-results';
import EbtSettings from './ebt-settings';
import EbtSutta from './ebt-sutta';
import EbtCursor from './ebt-cursor';
import { Tipitaka } from 'scv-esm';

const JS = {
  BilaraWeb: require('../src/bilara-web'),
  Tipitaka,
}

export default {
  components: {
    EbtSearchField,
    EbtResults,
    EbtSutta,
    EbtSettings,
    EbtCursor,
  },
  props: {
  },
  data: function(){
    return {
      panels: [0,1],
      monolingual: null,
    };
  },
  mounted() {
  },
  methods:{
    search(value) {
      console.log(`search:`, value);
    },
  },
  computed: {
    version() {
      return require('../package.json').version;
    },
    js() { 
      return JS;
    },
  },
}
</script>
<style>
.v-application code {
  background-color: #000;
}

.desktop-search {
  xmax-width: 28rem;
}

.desktop-nav {
  width: 100%;
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
  background-color: #eee;
}

.desktop {
  display: flex;
  flex-flow: column;
  align-items: center;
}

</style>
