import { boot } from '@boot'
import i18n from '@/lang' // internationalization
import store from '@/store'
import router from '@/router'
import routing from '@/utils/routing'
import vars from '@/utils/vars'
import { oauth, guard } from '@/utils/oauth'
import views from '@/views' // view component lookups

export { boot, i18n, store, router, routing, vars, oauth, guard, views }
