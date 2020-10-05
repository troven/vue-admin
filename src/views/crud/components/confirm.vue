<template>
  <modal :name="name">
    <h3>{{ title }}</h3>
    <hr>
    <h4>{{ question }}</h4>
    <div class="form-buttons ">
      <el-button size="large" type="primary" @click="ok()">Yes</el-button>
      <el-button size="large" @click="cancel()">No</el-button>
    </div>
  </modal>
</template>

<script>

export default {
  name: 'CrudConfirm',
  props: {
    name: {
      type: String,
      required: false,
      default: 'crud-confirm'
    },
    title: {
      type: String,
      required: false,
      default: 'Confirmation'
    },
    question: {
      type: String,
      required: false,
      default: 'Are you sure?'
    }
  },
  data() {
    return {}
  },
  mounted() {
  },
  created() {
    console.log('confirm.init: %o', this)
    this.hide()
  },
  methods: {
    show() {
      this.$modal.show(this.name)
    },
    hide() {
      this.$modal.hide(this.name)
    },
    ok() {
      console.log('confirm.ok')
      this.hide()
      this.$emit('ok')
    },
    cancel() {
      console.log('confirm.cancel')
      this.hide()
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
  h3 {
    text-align: center;
    font-size: 2em;
  }
  h4 {
    text-align: center;
    font-size: 1.7em;
  }
  .form-buttons {
    padding: 16px 16px 0px 16px;
    text-align: center

  }
  .form-buttons .el-button {
    margin: 32pxs
  }

</style>
