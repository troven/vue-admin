export default {
  path: '/cms/headlines',
  component: 'layout/Inner',
  redirect: '/cms/headlines/list',
  name: 'Headlines',
  meta: {
    title: 'Headlines',
    icon: 'form'
  },
  children: [
    {
      path: 'list',
      component: 'views/crud/list',
      name: 'ListHeadlines',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/cms/headlines/delete/', key: 'id', title: '' }, update: { url: '/cms/headlines/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Headlines', url: '/cms/headlines/create' }, download: { title: 'Download Headlines', filename: 'entities' }},
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
          title: 'Headlines',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Headlines', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }, {
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateHeadlines',
      meta: {
        title: 'Create Headlines', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/cms/headlines/list' }, create: { title: 'Save Headlines', url: '/cms/headlines/list' }},
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
      name: 'UploadHeadlines',
      meta: {
        title: 'Upload Headlines', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/cms/headlines/list' }, upload: { title: 'Upload Headlines', url: '/cms/headlines/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditHeadlines',
      meta: {
        title: 'Edit Headlines: {{hello}}', noCache: true, activeMenu: '/cms/headlines/list'
      },
      props: {
        actions: { cancel: { url: '/cms/headlines/list', title: 'Cancel' }, update: { title: 'Save Headlines', url: '/cms/headlines/list' }},
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
    }
  ]
}
