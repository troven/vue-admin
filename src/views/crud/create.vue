<template>
  <div>
    <crud-detail :schema="schema" :ui="ui" :model.sync="model" :actions="actions" :api="api" mode="create" />
  </div>
</template>

<script>
import CrudDetail from './components/detail'
import CRUD from '@/api/CRUD'
import _ from 'lodash'
import ui_schema from '../../utils/ui_schema'

export default {
  name: 'CrudCreate',
  components: { CrudDetail },
  props: {
    api: {
      type: Object,
      required: true
    },
    actions: {
      type: Object,
      required: true
    },
    ui: {
      type: Object,
      required: false,
      default: () => { return {} }
    },
    schema: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      model: {}
    }
  },
  computed: {
    meta() {
      return _.extend({}, this.$route.meta)
    },
    ui_schema() {
      return ui_schema.ui(this)
    }
  },
  created() {
    // const params = this.$route.params || {}
    this.actions.save = this.actions.create || this.actions.save
    this.crud = CRUD(this, this.$route.params)
    console.log('crud.create: %o -> %o', this.$route, this)
    // this.crud.read(params)
  }
}
</script>

