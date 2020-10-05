export default {
  path: '/cohorts',
  component: 'layout/Inner',
  redirect: '/cohorts/list',
  name: 'Cohorts',
  meta: {
    title: 'Cohorts',
    icon: 'form'
  },
  children: [
    {
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateCohort',
      meta: {
        title: 'Create Cohort', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/cohorts/list' }, create: { title: 'Save Cohort', url: '/cohorts/list' }},
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
      name: 'UploadCohort',
      meta: {
        title: 'Upload Cohort', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/cohorts/list' }, upload: { title: 'Upload Cohort', url: '/cohorts/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditCohort',
      meta: {
        title: 'Edit Cohort: {{hello}}', noCache: true, activeMenu: '/cohorts/list'
      },
      props: {
        actions: { cancel: { url: '/cohorts/list', title: 'Cancel' }, update: { title: 'Save Cohort', url: '/cohorts/list' }},
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
      name: 'ListCohorts',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/cohorts/delete/', key: 'id', title: '' }, update: { url: '/cohorts/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Cohorts', url: '/cohorts/create' }, download: { title: 'Download Cohorts', filename: 'entities' }},
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
          title: 'Cohort',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Cohorts', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }
  ]
}
