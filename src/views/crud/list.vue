<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="14">
          <h2>{{ heading }}</h2>
        </el-col>

        <el-col :span="10" align="right">
          <el-button v-if="actions.create" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit-outline" @click="gotoCreate">
            {{ actions.create.title || $t('table.create') }}
          </el-button>
          <el-button v-if="actions.download" v-waves :loading="downloading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
            {{ actions.download.title || $t('table.download') }}
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="loading"
      :data="list"
      :reserve-selection="true"
      border
      fit
      highlight-current-row
      style="width: 100%"
      element-loading-text="loading ..."
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="selectable" type="selection" align="center" />

      <el-table-column
        v-for="column in table_columns"
        :key="column.name"
        :prop="column.name"
        :label="column.title"
        :formatter="column.formatter"
        :width="column.width"
        :min-width="column.minWidth"
      />

      <el-table-column align="center" :label="$t('table.actions')" min-width="15%">
        <template slot-scope="scope">
          <router-link v-if="actions.update" :to="to_link(actions.update.url,scope.row)">
            <el-button type="primary" size="small" :icon="actions.update.icon">
              {{ actions.update.title || $t('table.update') }}
            </el-button>
          </router-link>
          <router-link v-if="actions.delete" :to="to_link(actions.delete.url,scope.row)">
            <el-button type="primary" size="small" :icon="actions.delete.icon">
              {{ actions.delete.title || $t('table.delete') }}
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import CRUD from '@/api/CRUD'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // waves directive
import * as _ from 'lodash'
import vars from '@/utils/vars'

export default {
  name: 'ListCRUD',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    api: {
      type: Object,
      required: true
    },
    actions: {
      type: Object,
      required: true
    },
    selectable: {
      type: Boolean,
      required: false,
      default: () => { return false }
    },
    columns: {
      type: Array,
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
      list: null,
      total: 0,
      loading: false,
      downloading: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      selected: []
    }
  },
  computed: {
    meta() {
      const meta = _.extend({ api: {}}, this.$route.meta)
      _.each(this.$route.matched, (m) => { meta.api = _.extend(meta.api, m.meta.api) })
      return meta
    },
    table_columns() {
      return (this.columns || []).filter(v => {
        return v.hidden !== false
      })
    }
  },
  mounted() {
    console.log('view.crud.list: %o', this.meta)

    if (!this.api.list || !this.api.list.url) {
      this.$message({ message: 'missing or invalid {meta.api.list}', type: 'error' })
      return
    }

    // setup CRUD API
    this.crud = CRUD(this, this.$route.params)
    this.getList()
  },
  methods: {
    to_link(url, row) {
      return vars.t(url, row)
    },
    gotoCreate() {
      this.$router.push(this.actions.create.url)
    },
    handleDownload() {
      if (!this.actions.download) return

      this.downloading = true
      const filename = this.actions.download.filename || 'download-sheet'
      const _Export2Excel = import('@/vendor/Export2Excel')
      // console.log('_Export2Excel: %o -> %o', _Export2Excel, Export2Excel)
      _Export2Excel.then(excel => {
        const header_cols = this.columns.filter(v => {
          return v.download !== false
        }).map(v => {
          return v.name
        })

        console.log('view.crud.list.excel: %o -> %o', this.selected, header_cols)
        // const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        // const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const rows = this.selectable ? this.selected : this.list
        const data = this.formatJson(header_cols, rows)
        excel.export_json_to_excel({
          header: header_cols,
          data,
          filename: filename
        })
        this.downloading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleSelectionChange(val) {
      console.log('view.crud.list.selected: %o', val)
      this.selected = val
    },
    getList() {
      this.loading = true
      this.crud.list().then(response => {
        console.log('crud.list.ok: %o', response)
        this.list = response
        this.total = response.length
        this.loading = false
      }).catch((err) => {
        console.log('crud.list.failed: %o', err)
        this.$message({ message: 'failed to load', type: 'error' })
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
h2 {
  margin-top: 0
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
