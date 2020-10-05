import locations from './lookups/locations'
import cohorts from './lookups/cohorts'
import consent_forms from './lookups/consent_forms'

export default {
  path: '/lookups',
  component: 'layout/Layout',
  name: 'lookups',
  meta: {
    title: 'Lookups',
    icon: 'form'
  },
  children: [
    locations, cohorts, consent_forms
  ]
}
