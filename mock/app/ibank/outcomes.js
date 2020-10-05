export default {
  path: '/outcomes',
  component: 'layout/Inner',
  redirect: '/outcomes/list',
  name: 'Outcomes',
  meta: {
    title: 'Outcomes',
    icon: 'form'
  },
  children: [
    {
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateOutcomes',
      meta: {
        title: 'Create Outcomes', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/outcomes/list' }, create: { title: 'Save Outcomes', url: '/outcomes/list' }},
        api: {
          create: {
            url: '/api/:tenant/crud'
          }
        },
        schema: {
          '$ref': '#/schemas/example'
        }
      }
    },
    {
      path: 'upload',
      component: 'views/crud/upload',
      name: 'UploadOutcomes',
      meta: {
        title: 'Upload Outcomes', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/outcomes/list' }, upload: { title: 'Upload Outcomes', url: '/outcomes/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditOutcomes',
      meta: {
        title: 'Edit Outcomes: {{hello}}', noCache: true, activeMenu: '/outcomes/list'
      },
      props: {
        actions: { cancel: { url: '/outcomes/list', title: 'Cancel' }, update: { title: 'Save Outcomes', url: '/outcomes/list' }},
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
          '$ref': '#/schemas/example'
        }
      }
    },
    {
      path: 'list',
      // component: '@/views/crud/list',
      component: 'views/crud/list',
      name: 'ListOutcomes',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/outcomes/delete/', key: 'id', title: '' }, update: { url: '/outcomes/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Outcomes', url: '/outcomes/create' }, download: { title: 'Download Outcomes', filename: 'entities' }},
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
          title: 'Outcomes',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Outcomes', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }
  ]
}
