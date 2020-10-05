<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="14">
          <h2>{{ heading }}</h2>
        </el-col>

        <el-col :span="10" align="right">
          <el-button v-if="hasSelection" type="primary" @click="apply_changes()">Apply</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table v-if="hasRows" ref="crud_upload_table" :data="rows" border fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column v-if="selectable" type="selection" align="center" />

      <el-table-column align="center" :label="$t('table.actions')" min-width="20%">
        <template slot-scope="scope">
          <!-- <el-button type="primary" x_icon="el-icon-edit"> -->
          <!-- {{ actions.approve.title || $t('table.approve') }} -->
          <el-tooltip :content="rowStatus(scope.row)">
            <div class="el-button el-button--primary el-button--small">
              {{ rowOperation(scope.row) }}
            </div>
          </el-tooltip>
          <!-- </el-button> -->
        </template>
      </el-table-column>

      <el-table-column v-for="item of columns" :key="item" :prop="item" :label="item" />

    </el-table>

    <upload-excel v-if="!hasSelection" :on-success="handleUploaded" :before-upload="beforeUpload" drop-style="dropped" />

  </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel'
import CRUD from '@/api/CRUD'
import * as _ from 'lodash'
const HiddenMetaKey = '__upload_meta__'

export default {
  name: 'UploadCrud',
  components: { UploadExcel },
  props: {
    indexBy: {
      type: String,
      required: true
    },
    api: {
      type: Object,
      required: true
    },
    heading: {
      type: String,
      required: false,
      default: () => { return '' }
    }
  },
  data() {
    return {
      operations: [],
      selectable: true,
      rows: [],
      columns: [],
      indexed: {}
    }
  },
  computed: {
    meta() {
      const meta = _.extend({ api: {}}, this.$route.meta)
      _.each(this.$route.matched, (m) => { meta.api = _.extend(meta.api, m.meta.api) })
      return meta
    },
    actions() {
      return { approve: { title: 'Approve' }}
    },
    maxFileSize() {
      return 1024 * 1024
    },
    hasRows() {
      return this.rows && this.rows.length > 0
    },
    hasSelection() {
      return this.operations && this.operations.length > 0
    }
  },
  created() {
    console.log('crud-upload: %o -> %o', this.api, this.$route)
    this.crud = CRUD(this.api, this.$route.params)
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / this.maxFileSize < 1

      if (isLt1M) {
        return true
      }

      this.$message({ message: 'Please do not upload files larger than ' + this.maxFileSize + 'mb in size.', type: 'warning' })
      return false
    },
    indexItems(items, indexBy) {
      const ix = {}
      for (const i in items) {
        const item = items[i]
        const key = item[indexBy]
        ix[key] = item
        item[HiddenMetaKey] = { operation: '', error: '' }
      }
      return ix
    },
    rowOperation(row) {
      if (!row || !row[HiddenMetaKey]) {
        return this.$t('views.crud.upload.operation.unknown')
      }
      return this.$t('views.crud.upload.operation.' + row[HiddenMetaKey].operation)
    },
    rowStatus(row) {
      if (!row || !row[HiddenMetaKey]) {
        return this.$t('views.crud.upload.status.invalid')
      }
      return row[HiddenMetaKey].error || this.$t('views.crud.upload.status.' + row[HiddenMetaKey].operation)
    },
    computeChangeSet(changes, originals) {
      for (const i in changes) {
        const change = changes[i]
        const key = change[this.indexBy]
        if (key) {
          const orig = originals[key]
          if (!orig) {
            change[HiddenMetaKey] = { operation: 'create', error: '' }
          } else {
            change[HiddenMetaKey] = { operation: 'update', error: '' }
          }
        } else {
          change[HiddenMetaKey] = { operation: 'no_key', error: '' }
        }
        console.log('change: %s -> %o', key, change)
      }
    },
    handleUploaded({ results, header }) {
      console.log('excel-uploaded: %o => %o', results, header)
      this.crud.list().then(response => {
        const items = response.data.items
        this.indexed = this.indexItems(items, this.indexBy)
        this.computeChangeSet(results, this.indexed)
        this.rows = results
        this.columns = header
        console.log('crud.indexed: %o -> %o', this.indexed, items)
      }).catch(err => {
        this.$message({ message: err, type: 'error' })
        this.indexed = {}
        this.rows = []
        this.columns = []
      })
    },
    apply_changes() {
      for (const s in this.operations) {
        const item = this.operations[s]
        const item_meta = item[HiddenMetaKey]
        if (item_meta) {
          const oper = item_meta.operation
          delete item[HiddenMetaKey]
          if (oper === 'create') {
            // console.log('CREATE: %o', item)
            this.crud.create(item).then(this.handleChangeSuccess(item)).catch(this.handleChangeError(item))
          } else if (oper === 'update') {
            // console.log('UPDATE: %o', item)
            this.crud.update(item).then(this.handleChangeSuccess(item)).catch(this.handleChangeError(item))
          }
        }
      }
    },
    handleSelectionChange(selection) {
      this.operations = selection
      this.computeChangeSet(selection, this.indexed)
      console.log('handleSelectionChange: %o', selection)
    },
    handleChangeSuccess(item) {
      return (ok) => {
        item[HiddenMetaKey] = { operation: 'done', error: '' }
        console.log('UPDATED: %o -> %o', item, ok)
      }
    },
    handleChangeError(item) {
      return (err) => {
        item[HiddenMetaKey] = { operation: 'error', error: err.message }
        this.$refs.crud_upload_table.toggleRowSelection(item)
        // this.$message({ message: err + ' - ' + item[this.indexBy], type: 'error' })
        console.log('FAILED: %o -> %o', item, err)
      }
    }
  }
}
</script>
