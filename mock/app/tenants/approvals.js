export default {
  path: '/approvals',
  component: 'layout/Inner',
  redirect: '/approvals/list',
  name: 'Approvals',
  meta: {
    title: 'Approvals',
    icon: 'form'
  },
  children: [
    {
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateApproval',
      meta: {
        title: 'Create Approval', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/approvals/list' }, create: { title: 'Save Approval', url: '/approvals/list' }},
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
      name: 'UploadApproval',
      meta: {
        title: 'Upload Approval', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/approvals/list' }, upload: { title: 'Upload Approval', url: '/approvals/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditApproval',
      meta: {
        title: 'Edit Approval: {{hello}}', noCache: true, activeMenu: '/approvals/list'
      },
      props: {
        actions: { cancel: { url: '/approvals/list', title: 'Cancel' }, update: { title: 'Save Approval', url: '/approvals/list' }},
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
      name: 'ListApprovals',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/approvals/delete/', key: 'id', title: '' }, update: { url: '/approvals/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Approvals', url: '/approvals/create' }, download: { title: 'Download Approvals', filename: 'entities' }},
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
          title: 'Approval',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Approvals', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }
  ]
}
