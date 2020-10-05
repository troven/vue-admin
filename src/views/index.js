
const views = {
  'complex-table': () => { return import('@/views/table/complex-table') },
  'dynamic-table': () => { return import('@/views/table/dynamic-table') },
  'documentation': () => { return import('@/views/documentation') },
  // 'detail-table': () => { return import('@/views/table/detail-table') },
  'views/clipboard': () => { return import('@/views/clipboard') },
  'views/crud/create': () => { return import('@/views/crud/create') },
  'views/crud/edit': () => { return import('@/views/crud/edit') },
  'views/crud/list': () => { return import('@/views/crud/list') },
  'views/crud/upload': () => { return import('@/views/crud/upload') },
  'views/home': () => { return import('@/views/home') },
  'views/documentation': () => { return import('@/views/documentation') },
  'views/error-log': () => { return import('@/views/error-log') },
  'views/error-page/401': () => { return import('@/views/error-page/401') },
  'views/error-page/403': () => { return import('@/views/error-page/403') },
  'views/error-page/404': () => { return import('@/views/error-page/404') },
  'views/example/create': () => { return import('@/views/example/create') },
  'views/example/edit': () => { return import('@/views/example/edit') },
  'views/example/list': () => { return import('@/views/example/list') },
  'views/excel/export-excel': () => { return import('@/views/excel/export-excel') },
  'views/excel/merge-header': () => { return import('@/views/excel/merge-header') },
  'views/excel/select-excel': () => { return import('@/views/excel/select-excel') },
  'views/excel/upload-excel': () => { return import('@/views/excel/upload-excel') },
  'views/guide': () => { return import('@/views/guide') },
  'views/icons': () => { return import('@/views/icons') },
  'views/pdf': () => { return import('@/views/pdf') },
  'views/profile': () => { return import('@/views/profile') },
  'views/redirect': () => { return import('@/views/redirect') },
  'views/tab': () => { return import('@/views/tab') },
  'views/table/complex-table': () => { return import('@/views/table/complex-table') },
  'views/theme': () => { return import('@/views/theme') },
  'views/zip': () => { return import('@/views/zip') },
  // Synonyms
  '': () => { return import('@/layout/InnerLayout') },
  'layout/Layout': () => { return import('@/layout/OuterLayout') },
  'layout/Outer': () => { return import('@/layout/OuterLayout') },
  'layout/Inner': () => { return import('@/layout/InnerLayout') }
}

// // https://webpack.js.org/guides/dependency-management/#requirecontext
// const viewFiles = require.context('./', true, /\.js$/, 'sync')
// console.log('viewFiles: %o => %o', viewFiles, views)

// // auto require all views

// viewFiles.keys().reduce((views, viewPath) => {
//   const viewName = viewPath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = viewFiles(viewPath)
//   views[viewName] = value.default
//   return views
// }, {})

console.log('views.loaded: %o', views)
export default views
