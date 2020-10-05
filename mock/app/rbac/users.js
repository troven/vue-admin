export default {
  path: '/users',
  component: 'layout/Inner',
  redirect: '/users/list',
  name: 'Users',
  meta: {
    title: 'Users',
    icon: 'form'
  },
  children: [
    {
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateUser',
      meta: {
        title: 'Create User', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/users/list' }, create: { title: 'Save User', url: '/users/list' }},
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
      name: 'UploadUser',
      meta: {
        title: 'Upload User', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/users/list' }, upload: { title: 'Upload User', url: '/users/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditUser',
      meta: {
        title: 'Edit User: {{hello}}', noCache: true, activeMenu: '/users/list'
      },
      props: {
        actions: { cancel: { url: '/users/list', title: 'Cancel' }, update: { title: 'Save User', url: '/users/list' }},
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
      name: 'ListUsers',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/users/delete/', key: 'id', title: '' }, update: { url: '/users/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Users', url: '/users/create' }, download: { title: 'Download Users', filename: 'entities' }},
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
          title: 'User',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Users', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }
  ]
}
