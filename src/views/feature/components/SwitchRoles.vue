<template>
  <div>
    <div style="margin-bottom:15px;">
      Your feaures: {{ features }}
    </div>
    Switch feaures:
    <el-radio-group v-model="current_feature">
      <el-radio-button v-for="(feature,i) in features" :key="i" :label="feature" item="feature" />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  computed: {
    features() {
      return this.$store.getters.features
    },
    current_feature: {
      get() {
        return this.features[0]
      },
      set(val) {
        this.$store.dispatch('app/setFeatures', [val]).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
