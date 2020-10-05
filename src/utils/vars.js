import _ from 'lodash'
import ptr from 'json-ptr'

function t(text, data) {
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  }

  var template = _.template(text)
  return template(data)
}

async function deref(original) {
  const resolve = function(obj) {
    _.each(obj, (v, k) => {
      if (k === '$ref') {
        const found = resolve(ptr.get(original, v))
        // console.log('deref: %o --> %o ==> %o', k, v, found)
        delete obj[k]
        _.extend(obj, found)
      } else if (_.isObject(v) || _.isArray(v)) {
        resolve(v)
      }
    })
    return obj
  }

  resolve(original)

  return original
}

function sanitize(txt, subst) {
  if (!txt) return ''
  subst = subst || '_'
  return txt.replace(/[^A-Z0-9]/ig, subst)
}

export default { t, deref, sanitize }
