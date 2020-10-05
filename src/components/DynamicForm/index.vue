<template>
  <div class="createPost-container">
    <ncform v-model="form" :form-schema="schema" :form-name="formName" :is-dirty.sync="hasChanged" />
  </div>
</template>

<script>
import Vue from 'vue'
import vueNcform from '@ncform/ncform'
import NcformAce from '@ncform/ncform-ace'
import ncformStdComps from '@ncform/ncform-theme-elementui'
import ncformCommon from '@ncform/ncform-common'
import Tinymce from '@/components/Tinymce'
import axios from 'axios'
// import _ from 'lodash'

Vue.use(vueNcform, { extComponents: { ...ncformStdComps }})
window.$http = Vue.prototype.$http = axios

export default {
  name: 'DynamicForm',
  // components: { vueNcform },
  mixins: [ncformCommon.mixins.vue.controlMixin],
  props: {
    formName: {
      type: String,
      required: true
    },
    schema: {
      type: Object,
      required: true
    },
    ui: {
      type: Object,
      required: false,
      default: () => { return {} }
    },
    model: {
      type: Object,
      required: true
    },
    isDirty: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      hasChanged: false,
      form: { ... this.model }
    }
  },
  i18nData: {},
  computed: {
    meta() {
      return this.$route.meta
    }
  },
  watch: {
    hasChanged(val) {
      console.log('form.dirty: %o', val)
      this.$emit('update:is-dirty', val)
    },
    form(val) {
      console.log('form.value: %o', val)
      this.$emit('update:model', val)
    },
    model(val) {
      console.log('model.value: %o', val)
      this.form = val;
    }
  },
  created() {
    this.$ncformAddWidget({ name: 'code', widget: NcformAce })
    this.$ncformAddWidget({ name: 'Wysiwyg', widget: Tinymce })
    const widgets = this.$ncformAllWidgets()

    console.log('form.init: %s --> %o --> %o', this.formName, widgets, this.form)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
</style>
