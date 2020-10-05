import news from './cms/news'
import tutorials from './cms/tutorials'
import headlines from './cms/headlines'

export default {
  path: '/cms',
  component: 'layout/Layout',
  name: 'cms',
  meta: {
    title: 'CMS',
    icon: 'form'
  },
  children: [
    headlines, news, tutorials
  ]
}
