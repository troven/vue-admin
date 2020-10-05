// mock config
import tenants from './app/tenants'
import lookups from './app/lookups'
import ibank from './app/ibank'
import cms from './app/cms'
import settings from './app/settings'
import rbac from './app/rbac'

export default [
  {
    url: '/api/:tenant/config',
    type: 'get',
    response: config => {
      console.log('mock.api.config: %j', config)
      return {
        features: ['basic', 'advanced', 'premium'],
        settings: {
          title: 'Amplify Online Admin',
          /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
          showSettings: false,

          /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
          tagsView: true,

          /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
          fixedHeader: true,

          /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
          logo: '/logo.png',

          /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   */
          errorLog: ['production', 'development'],

          /**
   * @type { array }  ['/login', '/auth-redirect']
   * @description routes that don't require login
   */
          public_routes: ['/login', '/auth-redirect'],

          baseURL: 'http://a80d8565-csiamplifysit-csi-480e-369912601.ap-southeast-2.elb.amazonaws.com'
        },
        /**
 * Navigation Router
 * menus can have `children`
 * path:                          the path models the navigation hierarchy. Supports named variables and regex validation patterns.
 * component:                     The registered 'view' name of the UI component
 *
 * hidden: false                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will not change the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    features: ['basic','advanced'] control the view features (you can set multiple features)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
 * props: {
    actions: { cancel: { url: '/cruds/list' }, create: { title: 'Save Model', url: '/cruds/list' }},
    api: {}
      create: {
        url:                     URL for the API HTTP/S request, always sends bearer token
        method:                  HTTP/S POST method for the API request. Change the over-ridden
      },
      list:{}                    HTTP/S GET (many) method for the API request. Change the over-ridden
      read:{}                    HTTP/S GET (one) method for the API request. Change the over-ridden
      update:{}                  HTTP/S PUT method for the API request. Change the over-ridden
      delete:{}                  HTTP/S DELETE method for the API request. Change the over-ridden
    },
    schema: {
      '$ref':                   Lookup the schema - for example '#/schemas/example'
    },
    ui: {
      field:name              the set of NX Form configs for named schema properties
    }
 */

        routes: [
          {
            path: '/',
            component: 'layout/Layout',
            redirect: '/documentation/index',
            x_children: [
              {
                path: 'home',
                component: 'views/home',
                name: 'Home',
                meta: { title: 'Home  ', icon: 'home', affix: true }
              }
            ]
          },
          {
            path: '/documentation',
            component: 'layout/Layout',
            children: [
              {
                path: 'index',
                component: 'views/documentation',
                name: 'Documentation',
                meta: { title: 'Documentation', icon: 'documentation', affix: true },
                props: {
                  topics: [
                    { title: 'Tech Support', href: 'http://a80d8565-csiamplifysit-csi-480e-369912601.ap-southeast-2.elb.amazonaws.com/docs/operate/support/index.md' },
                    { title: 'UX Architecture', href: 'http://a80d8565-csiamplifysit-csi-480e-369912601.ap-southeast-2.elb.amazonaws.com/docs/solution/06-ux/index.md' },
                    { title: 'Topic 3', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
                    { title: 'Topic 3', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
                    { title: 'Topic 4', href: 'https://juejin.im/post/5c92ff94f265da6128275a85' },
                    { title: 'Topic 5', href: 'https://segmentfault.com/a/1190000009090836' },
                    { title: 'Topic 6', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
                    { title: 'Topic 7', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
                    { title: 'Topic 8', href: 'https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc' }
                  ]
                }
              }
            ]
          },
          // {
          //   path: '/guide',
          //   component: 'Layout',
          //   redirect: '/guide/index',
          //   children: [
          //     {
          //       path: 'index',
          //       component: 'views/guide',
          //       name: 'Guide',
          //       meta: { title: 'Guide', icon: 'guide', noCache: true }
          //     }
          //   ]
          // },
          // {
          //   path: '/icon',
          //   component: 'layout/Layout',
          //   children: [
          //     {
          //       path: 'index',
          //       component: 'views/icons',
          //       name: 'Icons',
          //       meta: { title: 'Icons', icon: 'icon', noCache: true }
          //     }
          //   ]
          // },
          // {
          //   path: '/crud',
          //   component: 'layout/Layout',
          //   redirect: '/crud/index',
          //   hidden: true,
          //   children: [
          //     {
          //       path: 'index',
          //       component: 'views/crud',
          //       name: 'Model',
          //       meta: { title: 'Model', icon: 'user', noCache: true }
          //     }
          //   ]
          // },
          // {
          //   path: '/cruds',
          //   component: 'layout/Layout',
          //   redirect: '/cruds/list',
          //   name: 'Models',
          //   meta: {
          //     title: 'Models',
          //     icon: 'form'
          //   },
          //   children: [
          //     {
          //       path: 'create',
          //       component: 'views/crud/create',
          //       name: 'CreateModel',
          //       meta: {
          //         title: 'Create Model', icon: 'el-edit-outline'
          //       },
          //       props: {
          //         actions: { cancel: { title: 'Cancel', url: '/cruds/list' }, create: { title: 'Save Model', url: '/cruds/list' }},
          //         api: {
          //           create: {
          //             url: '/api/:tenant/crud'
          //           }
          //         },
          //         schema: {
          //           '$ref': '#/schemas/example'
          //         }
          //       }
          //     },
          //     {
          //       path: 'upload',
          //       component: 'views/crud/upload',
          //       name: 'UploadModel',
          //       meta: {
          //         title: 'Upload Model', icon: 'excel'
          //       },
          //       props: {
          //         actions: { cancel: { url: '/cruds/list' }, upload: { title: 'Upload Model', url: '/cruds/upload' }}
          //       }
          //     },
          //     {
          //       path: 'edit/:id(\\d+)',
          //       component: 'views/crud/edit',
          //       name: 'EditModel',
          //       meta: {
          //         title: 'Edit Model: {{hello}}', noCache: true, activeMenu: '/cruds/list'
          //       },
          //       props: {
          //         actions: { cancel: { url: '/cruds/list', title: 'Cancel' }, update: { title: 'Save Model', url: '/cruds/list' }},
          //         hidden: false,
          //         api: {
          //           read: {
          //             url: '/api/:tenant/crud/{{id}}'
          //           },
          //           update: {
          //             url: '/api/:tenant/crud/{{id}}'
          //           }
          //         },
          //         schema: {
          //           '$ref': '#/schemas/example'
          //         }
          //       }
          //     },
          //     {
          //       path: 'list',
          //       // component: '@/views/crud/list',
          //       component: 'views/crud/list',
          //       name: 'ListModels',
          //       props: {
          //         api: {
          //           list: {
          //             url: '/api/:tenant/crud/list'
          //           }
          //         },
          //         actions: { delete: { url: '/cruds/delete/', key: 'id', title: '' }, update: { url: '/cruds/edit/', key: 'id', icon: 'el-icon-edit' }, create: { title: 'Create Models', url: '/cruds/create' }, download: { title: 'Download Models', filename: 'entities' }},
          //         selectable: true,
          //         heading: 'Your profiles ...',
          //         columns: [{
          //           name: 'id',
          //           title: 'ID',
          //           minWidth: '5%',
          //           download: false,
          //           unique: true,
          //           id: true
          //         },
          //         {
          //           name: 'status',
          //           title: 'Approval',
          //           minWidth: '10%'
          //         },
          //         {
          //           name: 'author',
          //           title: 'Model',
          //           minWidth: '15%'
          //         },
          //         {
          //           name: 'title',
          //           title: 'Description',
          //           minWidth: '50%'
          //         }]
          //       },
          //       meta: {
          //         title: 'List Models', icon: 'list',
          //         features: ['advanced'],
          //         guard: ['a6s-dev-cms-admin']
          //       }
          //     }
          //   ]
          // },
          settings,
          tenants,
          cms,
          lookups,
          rbac,
          ibank
        ],
        /**
         * A set of global schemas. used to resolves $ref. For example #/schemas/example
         */
        schemas: {
          'example': {
            'title': 'Example',
            'type': 'object',
            'properties': {
              'hello': {
                'type': 'string',
                'default': 'World',
                'ui': {
                  'label': 'Title',
                  'columns': 3
                }
              },
              'body': {
                'default': 'Text Demo',
                'type': 'string',
                'ui': {
                  'label': 'Body Content',
                  'widget': 'wysiwyg',
                  'widgetConfig': {}
                }
              },
              'rating': {
                'type': 'number',
                'ui': {
                  'label': 'Rating',
                  'widget': 'input-number'
                }
              }
            }
          },
          'ie-indicators': {
            'title': 'Indicators',
            'type': 'array',
            'items': {
              '$ref': '#/schemas/ie-indicator'
            }
          },
          'ie-indicator-category': {
            'title': 'Indicator Category',
            'type': 'object',
            'properties': {
              '_id': {
                'type': 'string'
              },
              'name': {
                'type': 'string'
              }
            }
          },
          'ie-indicator-collection-method': {
            'title': 'Indicator Collection Method',
            'type': 'object',
            'properties': {
              '_id': {
                'type': 'string'
              },
              'name': {
                'type': 'string'
              }
            }
          },
          'ie-indicator-measure': {
            'title': 'Indicator Measure',
            'type': 'object',
            'properties': {
              '_id': {
                'type': 'string'
              },
              'name': {
                'type': 'string'
              }
            }
          },
          'ie-indicator-validity': {
            'title': 'Indicator Validity',
            'type': 'object',
            'properties': {
              '_id': {
                'type': 'string'
              },
              'name': {
                'type': 'string'
              }
            }
          },
          'ie-indicator': {
            'title': 'Indicator',
            'x-schema-source': 'default',
            'type': 'object',
            'required': ['title'],
            'properties': {
              '_id': {
                'type': 'string'
              },
              'code': {
                'title': 'Indicator Code',
                'type': 'string'
              },
              'title': {
                'type': 'string'
              },
              'description': {
                'type': 'string'
              },
              'category': {
                'type': 'string',
                'x-sql-type': 'uuid',
                'enum': [
                  'Outcomes', 'Processes', 'Demographics'
                ]
              },
              'ie_collection_method': {
                'type': 'object',
                '$ref': '#/schemas/ie-indicator-collection-method'
              },
              'ie_validity_id': {
                'type': 'string',
                'x-sql-type': 'uuid'
              },
              'ie_cohort_id': {
                'type': 'string',
                'x-sql-type': 'uuid'
              },
              'ref': {
                'type': 'string'
              },
              'national_data': {
                'type': 'boolean'
              },
              'measurement_tool_length': {
                'type': 'integer'
              },
              'splitting_scale_allowed': {
                'type': 'integer'
              },
              'psychometric_scale': {
                'type': 'string'
              },
              'comment': {
                'type': 'string'
              },
              'score': {
                'type': 'string'
              },
              'reference': {
                'type': 'string'
              },
              'reliability': {
                'type': 'string'
              },
              'ip': {
                'type': 'string'
              },
              'cost_to_access': {
                'type': 'string'
              },
              'contact_details': {
                'type': 'string'
              },
              'rating': {
                'type': 'integer'
              },
              'questions': {
                'type': 'array',
                'items': {
                  '$ref': '#/schemas/ie-survey-question'
                }
              },
              'measures': {
                'type': 'array',
                'items': {
                  '$ref': '#/schemas/ie-indicator-measure'
                }
              }
            }
          },
          'ie-survey-question': {
            'title': 'Question',
            'type': 'object',
            'x-schema-source': 'default',
            'properties': {
              'code': {
                'type': 'string'
              },
              'indicator_code': {
                'type': 'string'
              },
              'pretext': {
                'type': 'string'
              },
              'wording': {
                'type': 'string'
              },
              'related': {
                'type': 'array',
                'items': {
                  '$ref': '#/schemas/ie-survey-related-question'
                }
              },
              'responses': {
                'type': 'array',
                'items': {
                  '$ref': '#/schemas/ie-survey-response'
                }
              }
            }
          },
          'ie-survey-response': {
            'title': 'Question Response',
            'type': 'object',
            'x-schema-source': 'default',
            'properties': {
              'label': {
                'type': 'string'
              },
              'value': {
                'type': 'string'
              }
            }
          },
          'ie-outcome-indicator': {
            'title': 'Outcome Indicator',
            'type': 'object',
            'properties': {
              'outcome_id': {
                'type': 'string',
                'x-sql-type': 'uuid'
              },
              'indicator_id': {
                'type': 'string',
                'x-sql-type': 'uuid'
              }
            }
          }
        }
      }
    }
  }
]
