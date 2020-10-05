export default {
  path: '/locations',
  component: 'layout/Inner',
  redirect: '/locations/list',
  name: 'Locations',
  meta: {
    title: 'Locations',
    icon: 'form'
  },
  children: [
    {
      path: 'list',
      // component: '@/views/crud/list',
      component: 'views/crud/list',
      name: 'ListLocations',
      props: {
        api: {
          list: {
            url: '/api/ie/locations'
          }
        },
        actions: { delete: { url: '/locations/delete/', key: 'id', title: '' }, update: { url: '/locations/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Locations', url: '/locations/create' }, download: { title: 'Download Locations', filename: 'entities' }},
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
          title: 'Location',
          minWidth: '15%'
        },
        {
          name: 'title',
          title: 'Description',
          minWidth: '50%'
        }]
      },
      meta: {
        title: 'List Locations', icon: 'list',
        features: ['advanced'],
        guard: ['a6s-dev-cms-admin']
      }
    }    ,{
      path: 'create',
      component: 'views/crud/create',
      name: 'CreateLocation',
      meta: {
        title: 'Create Location', icon: 'el-edit-outline'
      },
      props: {
        actions: { cancel: { title: 'Cancel', url: '/locations/list' }, create: { title: 'Save Location', url: '/locations/list' }},
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
      name: 'UploadLocation',
      meta: {
        title: 'Upload Location', icon: 'excel'
      },
      props: {
        actions: { cancel: { url: '/locations/list' }, upload: { title: 'Upload Location', url: '/locations/upload' }}
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: 'views/crud/edit',
      name: 'EditLocation',
      meta: {
        title: 'Edit Location: {{hello}}', noCache: true, activeMenu: '/locations/list'
      },
      props: {
        actions: { cancel: { url: '/locations/list', title: 'Cancel' }, update: { title: 'Save Location', url: '/locations/list' }},
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
