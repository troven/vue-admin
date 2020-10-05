import domains from './ibank/domains'
import indicators from './ibank/indicators'
import outcomes from './ibank/outcomes'
import questions from './ibank/questions'

export default {
  path: '/ibank',
  component: 'layout/Layout',
  name: 'indicator_bank',
  meta: {
    title: 'Indicator Bank',
    icon: 'form'
  },
  children: [
    domains, indicators, outcomes, questions
  ]
}
