<template>
  <div class="filter-container">
    <crud-confirm ref="cancelConfirmed" title="Your changes will be lost" question="Do you want to continue ?" @ok="cancelConfirmed" />
    <el-row>
      <el-col :span="14">
        <h2>{{ heading }}</h2>
      </el-col>

      <el-col :span="10" align="right">
        <el-button v-if="save_button_label?isDirty:false" type="primary" @click="save()">{{ save_button_label }}</el-button>
        <el-button v-if="cancel_button_label?true:false" @click="cancel()">{{ cancel_button_label }}</el-button>
      </el-col>
    </el-row>

    <DynamicForm :ref="form_name" class="card" :form-name="form_name" :schema="ui_schema" :model.sync="form" :is-dirty.sync="isDirty" />

    <div class="form-buttons">
      <el-button v-if="save_button_label?isDirty:false" type="primary" @click="save()">{{ save_button_label }}</el-button>
      <el-button v-if="cancel_button_label?true:false" @click="cancel()">{{ cancel_button_label }}</el-button>
    </div>
  </div>
</template>

<script>

import DynamicForm from '@/components/DynamicForm'
import CrudConfirm from './confirm'
import CRUD from '@/api/CRUD'
import vars from '@/utils/vars'
import ui_schema from '@/utils/ui_schema'

export default {
  name: 'CrudDetail',
  components: { DynamicForm, CrudConfirm },
  props: {
    mode: {
      type: String,
      required: true
    },
    heading: {
      type: String,
      required: true
    },
    api: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
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
    actions: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDirty: false,
      form: { ... this.model },
      loading: false,
      tempRoute: {}
    }
  },
  computed: {
    form_name() {
      return this.name + '_' + vars.sanitize(this.$route.path)
    },
    meta() {
      return this.$route.meta || {}
    },
    ui_schema() {
      return ui_schema.ui(this)
    },
    save_button_label() {
      return this.actions[this.mode].title
    },
    cancel_button_label() {
      if (!this.actions.cancel) return ''
      return this.actions.cancel.title
    }
  },
  watch: {
    model(val) {
      this.form = this.model
      console.log('crud.model: %o', this.form)
    }
  },
  mounted() {
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)

    this.crud = CRUD(this, this.$route.params)
    if (!this.crud[this.mode]) throw new Error(this.mode + ' not in {{api}}')

    console.log('crud.details: %o', this)
  },
  methods: {
    save() {
      const model = this.form
      console.log('crud.save: %o --> %o', this.mode, model)

      this.$ncformValidate(this.form_name).then(valid => {
        console.log('crud.valid: %o -> %o', valid, model)
        if (valid.result) {
          this.crud[this.mode](this.model).then((data) => {
            console.log('crud.saved [%s]: %o -> %o', this.mode, this.model, data)
          }).catch((err) => {
            this.$message({ message: 'Save failed: ' + err.toString(), type: 'error' })
          })
        } else {
          let err_message = ''
          for (const v in valid.detail) {
            const detail = valid.detail[v]
            if (detail && detail.result && detail.result && detail.result.errMsg) {
              err_message = detail.result.errMsg
            }
          }
          this.$message({ message: err_message, type: 'error' })
        }
      })
    },
    cancel() {
      if (this.isDirty) {
        console.log('crud.cancel: %o -> %o / %o', this.model, this.$refs[this.form_name].isDirty, this.isDirty)
        this.$refs.cancelConfirmed.show()
      } else this.cancelConfirmed()
    },
    cancelConfirmed() {
      const list_url = this.actions.cancel.url || this.actions.list.url
      if (list_url) this.$router.push(list_url)
    },
    setTagsViewTitle() {
      const title = this.setPageTitle().substring(0, 32) // maximum size
      const route = Object.assign({}, this.tempRoute, { title: title })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = vars.t(this.meta.title, this.form).substring(0, 128) // maximum size
      document.title = title
      return title
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

h2 {
  margin-top: 0
}
.form-container {
  position: relative;

  .form-buttons {
    padding: 16px 16px 0px 16px;
    text-align: right
  }

}
</style>
