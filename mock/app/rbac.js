import users from './rbac/users'
import roles from './rbac/roles'

export default {
  path: '/rbac',
  component: 'layout/Layout',
  name: 'rbac',
  meta: {
    title: 'RBAC',
    icon: 'form'
  },
  children: [
    roles, users
  ]
}
