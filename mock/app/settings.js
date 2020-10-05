export default {
  path: '/settings',
  component: 'layout/Layout',
  name: 'Settings',
  meta: {
    title: 'Settings',
    icon: 'form'
  },
  children: [
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditSettings',
      meta: {
        title: 'Edit Settings', noCache: true, activeMenu: '/settings'
      },
      props: {
        actions: { cancel: { url: '/settings/list', title: 'Cancel' }, update: { title: 'Save Settings', url: '/settings/list' }},
        hidden: false,
        api: {
          read: {
            url: '/api/:tenant/crud/{{id}}'
          },
          update: {
            url: '/api/:tenant/crud/{{id}}'
          }
        },
        schema: {
          type: 'object',
          properties: {
            env: {
              type: 'string',
              title: 'Code Environment',
              default: 'sit',
              enum: ['sit', 'uat', 'staging', 'live'],
              ui: {
                readonly: true
              }
            },
            title: {
              type: 'string',
              title: 'Brand Title',
              default: 'Amplify Online'
            },
            tagline: {
              type: 'string',
              title: 'Tag Line',
              default: 'Measure Your Impact'
            },
            logo_url: {
              type: 'string',
              title: 'Logo URL'
            },
            indicator_release: {
              type: 'number',
              title: 'Indicator Release',
              enum: ['0 - Dev', '1- QA / UAT', '2 - Production'],
              default: '1- QA / UAT'
            }
          }
        }
      }
    },
    {
      path: 'list',
      // component: '@/views/crud/list',
      component: 'views/crud/list',
      name: 'ListSettings',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/settings/delete/', key: 'id', title: '' }, update: { url: '/settings/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Settings', url: '/settings/create' }, download: { title: 'Download Settings', filename: 'entities' }},
        selectable: true,
        heading: 'Your profiles ...',
        columns: [
          {
            name: 'title',
            title: 'Settings',
            minWidth: '50%'
          }]
      },
      meta: {
        title: 'Platform Settings', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }
  ]
}
