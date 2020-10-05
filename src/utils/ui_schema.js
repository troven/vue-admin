import _ from 'lodash'
const DEBUG = true

export default class ui_schema {
  static capitalize(sp) {
    return (sp.charAt(0).toUpperCase() + sp.slice(1)).replace(/[^a-zA-Z0-9]+/g, ' ')
  }

  static strings_to_select(strings) {
    const options = []
    for (const s in strings) {
      const text = strings[s]
      options.push({ value: s, label: ui_schema.capitalize(text) })
    }
    return options
  }

  static sweeten(sp, prop, ui) {
    // ui disable
    if (ui === false) {
      prop.ui = { disabled: true, hidden: true, readonly: true }
      return prop
    }

    // ui defaults
    prop.ui = _.extend({ label: prop.title, column: 3 }, prop.ui, ui)
    prop.ui.label = prop.ui.label || ui_schema.capitalize(sp)

    // help sugar
    if (prop.ui.help) {
      prop.ui.help = _.extend({ show: true, text: 'help', iconCls: 'fa fa-question' }, ui.help)
    }

    // move ui rules into props
    if (prop.ui.rules) {
      prop.rules = prop.ui.rules
      delete prop.ui.rules
    }

    // sugar for nxform values / defaults
    prop.value = prop.value || prop.ui.value
    prop.default = prop.default || prop.ui.default
    prop.valueTemplate = prop.valueTemplate || prop.ui.valueTemplate

    // sweeten enums into select options
    if (prop.enum && !prop.ui.widget) {
      prop.ui.widget = 'select'
      prop.ui.widgetConfig = { enumSource: ui_schema.strings_to_select(prop.enum) }
    }

    DEBUG && console.log('ui_schema.sweeten: %o -> ', sp, prop)
    return prop
  }

  static ui(self) {
    const schema = _.extend({ properties: {}}, self.schema)
    const is_required = schema.required || []

    for (const sp in schema.properties) {
      const prop = schema.properties[sp]
      const ui = self.ui[sp]
      ui_schema.sweeten(sp, prop, ui)
      // use schema 'required' property for UI validation rules
      if (is_required.indexOf(sp) >= 0) {
        prop.ui.rules = _.extend({ required: true }, prop.ui.rules)
      }
    }
    DEBUG && console.log('ui_schema.ui: %o', self, schema)
    return schema
  }
}
