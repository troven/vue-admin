import organisations from './tenants/organisations'
import approvals from './tenants/approvals'

export default {
  path: '/tenants',
  component: 'layout/Layout',
  name: 'tenants',
  meta: {
    title: 'Tenants',
    icon: 'form'
  },
  children: [
    approvals, organisations
  ]
}
