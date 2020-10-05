<template>
  <div class="app-container">
    <crud-detail :schema="schema" :model="model" :actions="actions" :api="api" mode="update" :heading="heading" />
  </div>
</template>

<script>
import CrudDetail from './components/detail'
import CRUD from '@/api/CRUD'
import _ from 'lodash'

export default {
  name: 'EditCRUD',
  components: { CrudDetail },
  props: {
    api: {
      type: Object,
      required: true
    },
    heading: {
      type: String,
      required: true
    },
    actions: {
      type: Object,
      required: true
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
      const meta = _.extend({}, this.$route.meta)
      return meta
    },
    params() {
      return this.$route.params || {}
    },
    save_button_label() {
      return this.actions.update.title || 'save'
    },
    cancel_button_label() {
      return this.actions.cancel.title || 'cancel'
    }
  },
  created() {
    console.log('crud.edit: %o -> %o', this.params, this)
    this.crud = CRUD(this, this.params)
    this.read()
  },
  methods: {
    read(params) {
      this.crud.read().then((data) => {
        this.model = data
        console.log('crud.edit.read: %o -> %o', this.params, data)
      }).catch((err) => {
        this.$message({ message: err.toString(), type: 'error' })
      })
    }
  }

}
</script>

