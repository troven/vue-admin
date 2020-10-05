import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
// import settings from '@/settings'

router.beforeEach(async(to, from, next) => {
  // set page title
  document.title = getPageTitle(store, to.meta.title)

  /* has no token*/
  const whiteList = this.$store.state.settings.public_routes || []
  if (whiteList.indexOf(to.path) !== -1) {
  // in the free login whitelist, go directly
    next()
  } else {
    next(`/403`) // access denied
    NProgress.done()
  }
})

router.afterEach(() => {
// finish progress bar
  NProgress.done()
})
