<template>
  <div
      class="ebt-checkbox"
      @click="stopPropagation($event)"
  >
    <input type="checkbox" 
      :id="_uid" 
      :checked="value"
      ref="input"
      @input="checkboxChanged($event)"
      :disabled="disabled"
      role="checkbox"
      :aria-checked="localValue"
      :label="label"
      />
    <label :for="_uid" class="ebt-label">{{label}}</label>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  components: {
  },
  props: {
    xref: {
      type: String,
      default: 'ebt-checkbox',
    },
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "(no label)",
    },
  },
  emits: ['update:value'],
  data: function(){
    return {
      localValue: this.value,
    };
  },
  mounted() {
    let { value,  xref} = this;
  },
  methods:{
    checkboxChanged(event) {
      let { value } = this;
      let checked = event.target.checked;
      this.localValue = checked;
      this.$emit('input', checked);
    },
    stopPropagation(event) {
      event.stopPropagation();
    },
  },
  computed: {
  },
}
</script>
<style>
</style>
