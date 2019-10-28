const { Window } = require('happy-dom')

const window = new Window()

Object.assign(global, [
  'document',
  'customElements',
  'DocumentFragment',
  'HTMLElement',
  'ShadowRoot'
].reduce((properties, property) => {
  properties[property] = window[property]
  return properties
}, {}))

global.NodeList = Array
