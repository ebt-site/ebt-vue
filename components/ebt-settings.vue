<template>
  <v-sheet class="ebt-settings" v-if="isMounted">
    <v-btn dark icon
        id="more-menu-btn"
        @click="clickSettings()"
        aria-haspopup="true"
        aria-controls="more-menu"
        :aria-label="$t('ariaMore')"
        :aria-expanded="moreVisible"
        class="ebt-icon-btn" :style="cssProps" >
        <v-icon size="20px" class="ebt-settings-icon">{{mdiCog}}</v-icon>
    </v-btn>
    <v-sheet light>
      <ul light class="ebt-more-menu" 
        id = "more-menu"
        ref="ref-more-menu"
        aria-labelledby="more-menu-btn"
        v-if="moreVisible"
        @focusin="focusMore(true)"
        :aria-hidden="!moreVisible">
        <li class="" role="none" ><!-- General -->
          <details role="menuitem" 
            @click="clickDetails('general', $event)"
            :open="!saveCookies || showDetail('general')"
          >
            <summary class="ebt-summary">
              <div class="ebt-settings-title">
                  <div>{{$t('general')}}</div>
                  <div class="body-2">
                    {{version}}
                    <span v-if="saveCookies">, cookies</span>
                  </div>
              </div><!--ebt-settings-title-->
            </summary>
            <div class="ebt-settings-detail">
              <ebt-checkbox v-model="saveSettingsExamples"
                ref="saveSettingsExamples-focus"
                :label="$t('storeSettingsHistory')"/>
            </div>
            <div class="ebt-settings-detail">
              <ebt-checkbox v-model="saveSettings"
                ref="saveSettings-focus"
                :label="$t('storeSettingsInCookies')"/>
            </div>
          </details>
        </li><!-- General -->
        <li class="" role="none" v-if="saveCookies && !monolingual"><!-- Language -->
          <details role="menuitem" 
            @click="clickDetails('lang', $event)"
            :open="showDetail('lang')"
          >
            <summary class="ebt-summary">
              <div class="ebt-settings-title">
                  <div>{{$t('languages')}}</div>
                  <div v-if="openDetail!=='lang'" class="body-2">
                    {{locale.toUpperCase()}} {{lang.toUpperCase()}} 
                  </div>
              </div><!--ebt-settings-title-->
            </summary>
            <div class="ebt-settings-detail">
              <div class="ebt-select-container">
                <select id="locale-select" 
                  ref="lang-focus"
                  class="ebt-select"
                  v-model="locale"
                  @click="stopPropagation($event)">
                  <option v-for="item in languages" :key="item.code" 
                    :selected="item.code===locale"
                    :value="item.code">{{item.label}}</option>
                </select>
                <label for="locale-select">{{$t('uiLanguage')}}</label>
              </div>
              <div class="ebt-select-container">
                <select id="lang-select" 
                  class="ebt-select"
                  v-model="lang"
                  @click="stopPropagation($event)">
                  <option v-for="item in transLanguages" :key="item.code" 
                    :selected="item.code===lang"
                    :value="item.code">{{item.label}}</option>
                </select>
                <label for="lang-select">{{$t('transLanguage')}}</label>
              </div>
            </div>
          </details>
        </li><!-- Language -->
        <li class="" role="none" v-if="saveCookies"><!-- Translation -->
          <details role="menuitem" 
            @click="clickDetails('trans', $event)"
            :open="showDetail('trans')"
          >
            <summary class="ebt-summary">
              <div class="ebt-settings-title">
                  <div>{{$t('textLayout')}}</div>
                  <div >
                    <span v-if="showId" class="body-2">#</span>
                    <span v-if="showPali" class="body-2">PLI</span>
                    <span v-if="showTrans" class="body-2">{{lang.toUpperCase()}}</span>
                    <span v-if="showReference" class="body-2">{{refLang.toUpperCase()}}</span>
                    <v-icon class="ebt-settings-icon"
                      v-if="showFormat"
                      {{ showFormat }}
                    </v-icon>
                  </div>
              </div><!--ebt-settings-title-->
            </summary>
            <div class="ebt-settings-detail">
              <ebt-checkbox v-model="showPali" 
                ref="trans-focus"
                :aria-checked="showPali"
                :label="$t('showPaliText')"
                @click="stopPropagation($event)"
                />
              <ebt-checkbox v-model="showTrans" 
                :aria-checked="showTrans"
                :label="$t('showTransText')"
                @click="stopPropagation($event)"
                />
              <ebt-checkbox v-model="showReference" 
                ref="trans-focus"
                :aria-checked="showReference"
                :label="$t('showReference')"
                @click="stopPropagation($event)"
                />
              <div v-if="showReference" class="ebt-select-container ml-5">
                <select id="ref-select" 
                  class="ebt-select"
                  v-model="refLang"
                  @click="stopPropagation($event)">
                  <option v-for="item in refLanguages" :key="item.code" 
                    :selected="item.code===lang"
                    :value="item.code">{{item.label}}</option>
                </select>
              </div>
              <v-divider class="mt-2 mb-2"/>
              <ebt-checkbox v-model="fullLine" 
                :aria-checked="fullLine"
                :label="$t('showLineByLine')"
                @click="stopPropagation($event)"
                />
              <ebt-checkbox v-model="showId" 
                :aria-checked="showId"
                :label="$t('showTextSegmentIds')"
                @click="stopPropagation($event)"
                />
            </div>
          </details>
        </li><!-- Translation -->
        <li class="" role="none" v-if="saveCookies"><!-- reader -->
          <details role="menuitem"
            @click="clickDetails('reader', $event)"
            :open="showDetail('reader')"
            >
            <summary class="ebt-summary">
              <div class="ebt-settings-title">
                <div>{{$t('reader')}}</div>
                <div>
                  <span class="body-2" v-if="showPali && openDetail!=='reader'">
                    {{vnameRoot}}</span>
                  <span class="body-2" v-if="showTrans && openDetail!=='reader'">
                    {{vnameTrans}}</span>
                </div>
              </div><!--ebt-settings-title-->
            </summary>
            <div class="ebt-settings-detail">
              <div class="ebt-select-container">
                <select id="reader-select-trans" 
                  class="ebt-select"
                  ref="reader-focus"
                  v-model="vnameTrans"
                  @click="stopPropagation($event)">
                  <option v-for="item in langVoices(lang, 'vnameTrans')" :key="item.code" 
                    :selected="item.name===vnameTrans"
                    :value="item.name">{{item.label}}</option>
                </select>
                <label for="reader-select-trans">{{lang.toUpperCase()}}</label>
              </div>
              <div class="ebt-select-container">
                <select id="reader-select-root" 
                  class="ebt-select"
                  v-model="vnameRoot"
                  @click="stopPropagation($event)">
                  <option v-for="item in langVoices('pli', 'vnameRoot')" :key="item.code" 
                    :selected="item.name===vnameRoot"
                    :value="item.name">{{item.label}}</option>
                </select>
                <label for="reader-select-root">Pali</label>
              </div>
            </div>
          </details>
        </li><!-- reader -->
        <li class="" role="none" v-if="saveCookies">
          <details role="menuitem" 
            @click="clickDetails('search', $event)"
            :open="showDetail('search')"
            >
            <summary class="ebt-summary">
              <div class="ebt-settings-title">
                <div>{{$t('searchResults')}}</div>
                <div class="body-2" v-if="openDetail!=='search'">{{maxResults}}</div>
              </div>
            </summary>
            <div class="ebt-settings-detail" >
              <div class="ebt-select-container"
                @click="stopPropagation($event)"
                >
                <select id="maxResults-select" 
                  ref="search-focus"
                  class="ebt-select"
                  v-model="maxResults"
                  >
                  <option v-for="n in [5,10,25,50]" :key="n" 
                    :selected="maxResults === n"
                    :value="n">{{n}} {{$t('searchResults')}}</option>
                </select>
              </div><!--ebt-select-container-->
            </div>
          </details>
        </li>
        <li class="" role="none" v-if="saveCookies"><!-- Audio -->
          <details role="menuitem" 
            @click="clickDetails('audio', $event)"
            :open="showDetail('audio')"
            >
            <summary class="ebt-summary">  
              <div class="ebt-settings-title"> 
                <div>{{$t('audio')}} </div>
                <div class="body-2" v-if="openDetail!=='audio'">{{audio}}</div>
              </div>
            </summary>
            <div class="ebt-settings-detail">
              <div class="ebt-select-container" @click="stopPropagation($event)" >
                <select id="audio-select" 
                  ref="audio-focus"
                  class="ebt-select "
                  v-model="audio"
                  >
                  <option :selected="audio==='opus'" value="opus">
                    Opus {{$t('audio')}}</option>
                  <option :selected="audio==='ogg'" value="ogg">
                    Ogg {{$t('audio')}}</option>
                  <option :selected="audio==='mp3'" value="mp3">
                    MP3 {{$t('audio')}}</option>
                </select>
              </div><!--ebt-select-container-->
              <div class="ebt-select-container" @click="stopPropagation($event)" >
                <select id="ips-select" 
                  ref="sound-focus"
                  class="ebt-select caption"
                  v-model="ips"
                  >
                  <option v-for="item in ipsChoices" :key="item.value" 
                    v-if="item.value !== 1"
                    :selected="item.value===ips"
                    :value="item.value">{{$t(item.i18n)}}</option>
                </select>
                <label for="ips-select" v-if="ips">
                  <v-btn icon 
                    class="ebt-icon-btn"
                    @click="playBell"
                    >
                    <v-icon small>{{mdiVolumeHigh}}</v-icon>
                  </v-btn>
                </label>
                <audio v-for="bell in ipsChoices"
                  :ref="`refIps${bell.value}`" 
                  preload=auto v-if="bell.value" >
                  <source type="audio/mp3" :src="bell.url.substring(1)" />
                  <p>{{$t('noHTML5')}}</p>
                </audio>
              </div><!--ebt-select-container-->
            </div>
          </details>
        </li><!-- Audio -->
        <li class="text-center settings-close" role="none">
          <v-btn id="btnSettings" 
            small
            class="ebt-text-btn"
            :aria-label="$t('ariaClose')"
            @click="clickClose(false,$event)"
            >
            {{$t('$vuetify.close')}}
          </v-btn>
        </li>
      </ul> <!-- ebt-more-menu -->
      </v-sheet>
  </v-sheet> <!-- ebt-more -->
</template>

<script>
import Vue from "vue";
import EbtCheckbox from './ebt-checkbox.vue';
import {
  mdiCog,
  mdiVolumeHigh,
  mdiFormatAlignJustify,
  mdiFormatColumns,
} from "@mdi/js";
const {
  Settings,
  BilaraWeb,
} = require('../src/index');
const {version } = require('../package.json');

export default {
  components: {
    EbtCheckbox,
  },
  props: {
    version: {
      type: String,
      default: version,
    },
    monolingual: {
      type: String,
      default: null,
    },
  },
  data: function(){
    return {
      isMounted: false,
      moreVisible: false,
      openDetail: null,
      languages: Settings.WEB_LANGUAGES,
      moreFocus: null,
      mdiCog,
      mdiVolumeHigh,
      mdiFormatAlignJustify,
      mdiFormatColumns,
    };
  },
  mounted() {
    let { monolingual } = this;
    this.$store.dispatch('ebt/loadVoices');
    Vue.set(this, "isMounted", true);
    if (monolingual) {
      this.locale = monolingual;
      this.lang = monolingual;
      console.debug(`ebt-settings mounted monolingual:${monolingual}`);
    } else {
      console.debug(`ebt-settings mounted`, this);
    }
  },
  methods:{
    clickDetails(id, evt) {
      let opening = id !== this.openDetail;
      Vue.set(this, "openDetail", opening ? id : undefined);
      let refFocus = `${id}-focus`;
      let idFocus = opening && this.$refs[refFocus];
      if (idFocus) {
        this.$nextTick(()=>{ 
          if (idFocus.$refs && idFocus.$refs.input) {
            idFocus.$refs.input.focus();
          } else if (idFocus.$el) {
            idFocus.$el.focus();
          } else {
            idFocus.focus(); 
          }
        });
      } else {
        console.log(`clickDetails no focus:`, refFocus);
      }
      evt.preventDefault();
    },
    showDetail(id) {
      return this.openDetail === id;
    },
    langLabel(lang) {
        return Settings.langLabel(lang);
    },
    clickSettings() {
      Vue.set(this, "moreVisible", !this.moreVisible);
    },
    focusMore(focus) {
      this.moreFocus = focus;
      setTimeout(()=>{
          if (!this.moreFocus) {
              this.moreVisible = false;
          }
      }, 500);
    },
    clickClose(focus, evt){
      console.log("clickClose");
      this.focusMore(focus);
      window.location.reload();
    },
    clickBackdrop(){
      this.focusMore(false);
    },
    stopPropagation(event) {
      event.stopPropagation();
    },
    localeChanged(event, code) {
      console.log('localeChanged', event, code);
    },
    langVoices(lang, vnameKey) {
      let { voices, } = this;
      let vname = this[vnameKey];
      let langVoices = voices.filter(v=>v.langTrans===lang);
      if (!langVoices.some(v=>v.name === vname)) {
        this.$nextTick(()=> {
          this[vnameKey] = langVoices[0].name;
        });
      }
      return langVoices;
    },
    playBell() {
      let ips = Settings.IPS_CHOICES[this.ips];
      if (ips) {
        let refAudio = this.$refs[`refIps${ips.value}`];
        let audio = refAudio instanceof Array ? refAudio[0] : refAudio;
        audio && audio.play();
      }
    },
  },
  computed: {
    ready() {
      return this.hasOwnProperty('$t');
    },
    fullLine: {
      get: function() { return this.$store.state.ebt.settings.fullLine; },
      set: function(value) { this.$store.commit("ebt/settings", {fullLine:value}); },
    },
    showTrans: {
      get: function() { return this.$store.state.ebt.settings.showTrans; },
      set: function(value) { this.$store.commit("ebt/settings", {showTrans:value}); },
    },
    showReference: {
      get: function() { return this.$store.state.ebt.settings.showReference; },
      set: function(value) { this.$store.commit("ebt/settings", {showReference:value}); },
    },
    showPali: {
      get: function() { return this.$store.state.ebt.settings.showPali; },
      set: function(value) { this.$store.commit("ebt/settings", {showPali:value}); },
    },
    showId: {
      get: function() { return this.$store.state.ebt.settings.showId; },
      set: function(value) { this.$store.commit("ebt/settings", {showId:value}); },
    },
    lang: {
      get: function() { return this.$store.state.ebt.settings.lang; },
      set: function(value) { this.$store.commit("ebt/settings", {lang:value}); },
    },
    maxResults: {
      get: function() { return this.$store.state.ebt.settings.maxResults; },
      set: function(value) { 
        this.$store.commit("ebt/settings", {maxResults:Number(value)}); },
    },
    refLang: {
      get: function() { return this.$store.state.ebt.settings.refLang; },
      set: function(value) { this.$store.commit("ebt/settings", {refLang:value}); },
    },
    locale: {
      get: function() { return this.$store.state.ebt.settings.locale; },
      set: function(value) { this.$store.commit("ebt/settings", {locale:value}); },
    },
    audio: {
      get: function() { return this.$store.state.ebt.settings.audio; },
      set: function(value) { this.$store.commit("ebt/settings", {audio:value}); },
    },
    saveCookies: {
      get: function() {
        return this.saveSettings || this.saveSettingsExamples;
      }
    },
    saveSettings: {
      get: function() { return !!this.$store.state.ebt.settings.saveSettings; },
      set: function(value) { 
        this.$store.commit("ebt/settings", {saveSettings:value}); 
      },
    },
    saveSettingsExamples: {
      get: function() { return !!this.$store.state.ebt.settings.saveSettingsExamples; },
      set: function(value) { 
        this.$store.commit("ebt/settings", {saveSettingsExamples:value}); 
      },
    },
    vnameRoot: {
      get: function() { return this.$store.state.ebt.settings.vnameRoot; },
      set: function(value) { 
        this.$store.commit("ebt/settings", {vnameRoot:value}); 
      },
    },
    vnameTrans: {
      get: function() { return this.$store.state.ebt.settings.vnameTrans; },
      set: function(value) { 
        this.$store.commit("ebt/settings", {vnameTrans:value}); 
      },
    },
    showFormat() {
      let { fullLine, mdiFormatAlignJustify, mdiFormatColumns } = this;
      let nText = 0;
      showPali && nText++;
      showTrans && nText++;
      showReference && nText++;
      if (fullLine && nText > 1) {
        return mdiFormatAlignJustify;
      }
      if (!fullLine && nText > 1) {
        return mdiFormatColumns;
      }
      return null;
    },
    settings() {
      return this.$store.state.ebt.settings;
    },
    voices() {
      return this.$store.state.ebt.voices;
    },
    refLanguages() {
      return Settings.REF_LANGUAGES;
    },
    transLanguages() {
      return Settings.TRANS_LANGUAGES;
    },
    cssProps() {
        return {
            'margin': '0',
        };
    },
    ipsChoices() {
      return Settings.IPS_CHOICES;
    },
    ipsUrl() {
      return this.ips && Settings.IPS_CHOICES[this.ips].url;
    },
    ips: {
      get: function() { return this.$store.state.ebt.settings.ips; },
      set: function(value) { this.$store.commit("ebt/settings", {ips:value}); },
    },
  },
}
</script>
