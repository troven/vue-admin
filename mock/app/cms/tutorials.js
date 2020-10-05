export default {
  path: '/tutorials',
  component: 'layout/Inner',
  redirect: '/tutorials/list',
  name: 'Tutorials',
  meta: {
    title: 'Tutorials',
    icon: 'form'
  },
  children: [
    {
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateTutorial',
      meta: {
        title: 'Create Tutorial', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/tutorials/list' }, create: { title: 'Save Tutorial', url: '/tutorials/list' }},
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
      name: 'UploadTutorial',
      meta: {
        title: 'Upload Tutorial', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/tutorials/list' }, upload: { title: 'Upload Tutorial', url: '/tutorials/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditTutorial',
      meta: {
        title: 'Edit Tutorial: {{hello}}', noCache: true, activeMenu: '/tutorials/list'
      },
      props: {
        actions: { cancel: { url: '/tutorials/list', title: 'Cancel' }, update: { title: 'Save Tutorial', url: '/tutorials/list' }},
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
      name: 'ListTutorials',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/tutorials/delete/', key: 'id', title: '' }, update: { url: '/tutorials/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Tutorials', url: '/tutorials/create' }, download: { title: 'Download Tutorials', filename: 'entities' }},
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
          title: 'Tutorial',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Tutorials', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }
  ]
}
