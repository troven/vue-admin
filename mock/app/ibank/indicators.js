export default {
  path: '/indicators',
  component: 'layout/Inner',
  redirect: '/indicators/list',
  name: 'Indicators',
  meta: {
    title: 'Indicators',
    icon: 'form'
  },
  children: [
    {
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateIndicator',
      meta: {
        title: 'Create Indicator', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/indicators/list' }, create: { title: 'Save Indicator', url: '/indicators/list' }},
        api: {
          create: {
            url: '/api/:tenant/crud'
          }
        },
        schema: {
          '$ref': '#/schemas/ie-indicator'
        },
        ui: {
          _id: false,
          title: {
            columns: 6
          },
          description: {
            widget: 'wysiwyg',
            label: 'Definition'
          },
          code: {
            rules: {
              number: true
            },
            label: 'Indicator code',
            columns: 1
          }
        }
      }
    },
    {
      path: 'upload',
      component: 'views/crud/upload',
      name: 'UploadIndicator',
      meta: {
        title: 'Upload Indicator', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/indicators/list' }, upload: { title: 'Upload Indicator', url: '/indicators/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditIndicator',
      meta: {
        title: 'Edit Indicator: {{hello}}', noCache: true, activeMenu: '/indicators/list'
      },
      props: {
        actions: { cancel: { url: '/indicators/list', title: 'Cancel' }, update: { title: 'Save Indicator', url: '/indicators/list' }},
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
          '$ref': '#/schemas/ie-indicator'
        }
      }
    },
    {
      path: 'list',
      // component: '@/views/crud/list',
      component: 'views/crud/list',
      name: 'ListIndicators',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/indicators/delete/', key: 'id', title: '' }, update: { url: '/indicators/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Indicators', url: '/indicators/create' }, download: { title: 'Download Indicators', filename: 'entities' }},
        selectable: true,
        heading: 'Your profiles ...',
        columns: [{
          name: 'id',
          title: 'ID',
          minWidth: '5%',
          download: false,
          unique: true,
          id: true
        },
        {
          name: 'status',
          title: 'Approval',
          minWidth: '10%'
        },
        {
          name: 'author',
          title: 'Indicator',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Indicators', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }
  ]
}
