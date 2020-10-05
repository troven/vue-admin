export default {
  path: '/domains',
  component: 'layout/Inner',
  redirect: '/domains/list',
  name: 'Domains',
  meta: {
    title: 'Domains',
    icon: 'form'
  },
  children: [
    {
      path: 'list',
      component: 'views/crud/list',
      name: 'ListDomains',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/domains/delete/', key: 'id', title: '' }, update: { url: '/domains/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Domains', url: '/domains/create' }, download: { title: 'Download Domains', filename: 'entities' }},
        selectable: true,
        heading: 'List of Domains ...',
        columns: [{
          name: 'id',
          title: 'ID',
          minWidth: '5%',
          download: false,
          unique: true,
          id: true
        },
        {
          name: 'title',
          title: 'Domain',
          minWidth: '15%'
        },
        {
          name: 'description',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Domains', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditDomain',
      meta: {
        title: 'Edit Domain', noCache: true, activeMenu: '/domains/list',
        guard: ['a6s-dev-cms-admin']
      },
      props: {
        actions: { cancel: { url: '/domains/list', title: 'Cancel' }, update: { title: 'Save Domain', url: '/domains/list' }},
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
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateDomain',
      meta: {
        title: 'Create Domain', icon: 'el-edit-outline',
        guard: ['a6s-dev-cms-admin']
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/domains/list' }, create: { title: 'Save Domain', url: '/domains/list' }},
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
      name: 'UploadDomain',
      meta: {
        title: 'Upload Domains', icon: 'excel',
        guard: ['a6s-dev-cms-admin']
      },
      props: {
        heading: 'Upload Domains ...',
        indexBy: 'code',
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          },
          update: {
            url: '/api/:tenant/crud/{{id}}'
          },
          create: {
            url: '/api/:tenant/crud/'
          }
        },
        actions: { cancel: { url: '/domains/list' }, upload: { title: 'Upload Domain', url: '/domains/upload' }}
      }
    }
  ]
}
