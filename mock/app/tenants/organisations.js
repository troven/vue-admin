export default {
  path: '/organisations',
  component: 'layout/Inner',
  redirect: '/organisations/list',
  name: 'Organisations',
  meta: {
    title: 'Organisations',
    icon: 'form'
  },
  children: [
    {
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateOrganisation',
      meta: {
        title: 'Create Organisation', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/organisations/list' }, create: { title: 'Save Organisation', url: '/organisations/list' }},
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
      name: 'UploadOrganisation',
      meta: {
        title: 'Upload Organisation', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/organisations/list' }, upload: { title: 'Upload Organisation', url: '/organisations/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditOrganisation',
      meta: {
        title: 'Edit Organisation: {{hello}}', noCache: true, activeMenu: '/organisations/list'
      },
      props: {
        actions: { cancel: { url: '/organisations/list', title: 'Cancel' }, update: { title: 'Save Organisation', url: '/organisations/list' }},
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
      name: 'ListOrganisations',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/organisations/delete/', key: 'id', title: '' }, update: { url: '/organisations/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Organisations', url: '/organisations/create' }, download: { title: 'Download Organisations', filename: 'entities' }},
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
          title: 'Organisation',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Organisations', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }
  ]
}
