export default {
  path: '/consent_forms',
  component: 'layout/Inner',
  redirect: '/consent_forms/list',
  name: 'Consent Forms',
  meta: {
    title: 'Consent Forms',
    icon: 'form'
  },
  children: [
    {
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateConsentForm',
      meta: {
        title: 'Create Consent Form', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/consent_forms/list' }, create: { title: 'Save Consent Form', url: '/consent_forms/list' }},
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
      name: 'UploadConsent Form',
      meta: {
        title: 'Upload Consent Form', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/consent_forms/list' }, upload: { title: 'Upload Consent Form', url: '/consent_forms/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditConsent Form',
      meta: {
        title: 'Edit Consent Form: {{hello}}', noCache: true, activeMenu: '/consent_forms/list'
      },
      props: {
        actions: { cancel: { url: '/consent_forms/list', title: 'Cancel' }, update: { title: 'Save Consent Form', url: '/consent_forms/list' }},
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
      name: 'ListConsent Forms',
      props: {
        api: {
          list: {
            url: '/api/:tenant/crud/list'
          }
        },
        actions: { delete: { url: '/consent_forms/delete/', key: 'id', title: '' }, update: { url: '/consent_forms/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Consent Forms', url: '/consent_forms/create' }, download: { title: 'Download Consent Forms', filename: 'entities' }},
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
          title: 'Consent Form',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Consent Forms', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }
  ]
}
