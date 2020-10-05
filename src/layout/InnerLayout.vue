<template>
  <router-view :key="key" />
</template>

<script>
// import { AppMain } from './components'
// import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'InnerLayout',
  components: {
    // AppMain
  },
  // mixins: [ResizeMixin],
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
