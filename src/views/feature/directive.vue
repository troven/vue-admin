<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top:30px;">
      <div>
        <span v-feature="['admin']" class="feature-alert">
          Only
          <el-tag class="feature-tag" size="small">admin</el-tag> can see this
        </span>
        <el-tag v-feature="['admin']" class="feature-sourceCode" type="info">
          v-feature="['admin']"
        </el-tag>
      </div>

      <div>
        <span v-feature="['editor']" class="feature-alert">
          Only
          <el-tag class="feature-tag" size="small">editor</el-tag> can see this
        </span>
        <el-tag v-feature="['editor']" class="feature-sourceCode" type="info">
          v-feature="['editor']"
        </el-tag>
      </div>

      <div>
        <span v-feature="['admin','editor']" class="feature-alert">
          Both
          <el-tag class="feature-tag" size="small">admin</el-tag> and
          <el-tag class="feature-tag" size="small">editor</el-tag> can see this
        </span>
        <el-tag v-feature="['admin','editor']" class="feature-sourceCode" type="info">
          v-feature="['admin','editor']"
        </el-tag>
      </div>
    </div>

    <div :key="'checkPermission'+key" style="margin-top:60px;">
      <aside>
        In some cases, using v-feature will have no effect. For example: Element-UI's Tab component or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.
        <br> e.g.
      </aside>

    </div>
  </div>
</template>

<script>
import feature from '@/directive/feature/index.js'
// import checkPermission from '@/utils/feature'
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'DirectivePermission',
  components: { SwitchRoles },
  directives: { feature },
  data() {
    return {
      key: 1
    }
  },
  methods: {
    // checkPermission,
    handleRolesChange() {
      this.key++
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  /deep/ .feature-alert {
    width: 320px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  /deep/ .feature-sourceCode {
    margin-left: 15px;
  }
  /deep/ .feature-tag {
    background-color: #ecf5ff;
  }
}
</style>

