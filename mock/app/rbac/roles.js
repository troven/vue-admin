export default {
  path: '/roles',
  component: 'layout/Inner',
  redirect: '/roles/list',
  name: 'Roles',
  meta: {
    title: 'Roles',
    icon: 'form'
  },
  children: [
    {
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateRole',
      meta: {
        title: 'Create Role', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/roles/list' }, create: { title: 'Save Role', url: '/roles/list' }},
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
      name: 'UploadRole',
      meta: {
        title: 'Upload Role', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/roles/list' }, upload: { title: 'Upload Role', url: '/roles/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditRole',
      meta: {
        title: 'Edit Role: {{hello}}', noCache: true, activeMenu: '/roles/list'
      },
      props: {
        actions: { cancel: { url: '/roles/list', title: 'Cancel' }, update: { title: 'Save Role', url: '/roles/list' }},
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
      name: 'ListRoles',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/roles/delete/', key: 'id', title: '' }, update: { url: '/roles/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Roles', url: '/roles/create' }, download: { title: 'Download Roles', filename: 'entities' }},
        selectable: true,
        heading: 'Manage Roles ...',
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
          title: 'Role',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Roles', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }
  ]
}
