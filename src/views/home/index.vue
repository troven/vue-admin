<template>
  <div class="home-container">
    <component :is="currentHome" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminHome from './admin'
import userHome from './user'

export default {
  name: 'Home',
  components: { adminHome, userHome },
  data() {
    return {
      currentHome: 'adminHome'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
  }
}
</script>
