export default {
  path: '/news',
  component: 'layout/Inner',
  redirect: '/news/list',
  name: 'News',
  meta: {
    title: 'News',
    icon: 'form'
  },
  children: [
    {
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateNews',
      meta: {
        title: 'Create News', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/news/list' }, create: { title: 'Save News', url: '/news/list' }},
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
      name: 'UploadNews',
      meta: {
        title: 'Upload News', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/news/list' }, upload: { title: 'Upload News', url: '/news/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditNews',
      meta: {
        title: 'Edit News: {{hello}}', noCache: true, activeMenu: '/news/list'
      },
      props: {
        actions: { cancel: { url: '/news/list', title: 'Cancel' }, update: { title: 'Save News', url: '/news/list' }},
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
      name: 'ListNews',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/news/delete/', key: 'id', title: '' }, update: { url: '/news/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create News', url: '/news/create' }, download: { title: 'Download News', filename: 'entities' }},
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
          title: 'News',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List News', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }
  ]
}
