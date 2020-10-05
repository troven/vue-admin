export default function getPageTitle(store, page_title) {
  const app_title = store.state.settings.title
  if (page_title) {
    return `${page_title} - ${app_title}`
  }
  return `${app_title}`
}
