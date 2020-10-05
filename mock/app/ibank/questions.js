export default {
  path: '/questions',
  component: 'layout/Inner',
  redirect: '/questions/list',
  name: 'Questions',
  meta: {
    title: 'Questions',
    icon: 'form'
  },
  children: [
    {
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateQuestions',
      meta: {
        title: 'Create Questions', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/questions/list' }, create: { title: 'Save Questions', url: '/questions/list' }},
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
      name: 'UploadQuestions',
      meta: {
        title: 'Upload Questions', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/questions/list' }, upload: { title: 'Upload Questions', url: '/questions/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditQuestions',
      meta: {
        title: 'Edit Questions: {{hello}}', noCache: true, activeMenu: '/questions/list'
      },
      props: {
        actions: { cancel: { url: '/questions/list', title: 'Cancel' }, update: { title: 'Save Questions', url: '/questions/list' }},
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
      name: 'ListQuestions',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/questions/delete/', key: 'id', title: '' }, update: { url: '/questions/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Questions', url: '/questions/create' }, download: { title: 'Download Questions', filename: 'entities' }},
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
          title: 'Questions',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Questions', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }
  ]
}
