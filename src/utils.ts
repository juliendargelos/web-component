import { Component } from '~/component'

export const define = (component: typeof Component): void => {
  customElements.define(component.tagName, component)
}

export const lazy = (
  target: Component,
  property: string
): void => {
  const get = Object.getOwnPropertyDescriptor(target, property)!.get!

  return Object.defineProperty(target, property, {
    get() {
      return Object.defineProperty(this, property, {
        value: get.call(this)
      })[property]
    }
  })
}

export const ref = (
  selector: string,
  { all = false }: { all?: boolean } = {}
) => (target: Component, property: string): void => Object.defineProperty(
  target,
  property,
  {
    configurable: true,
    get: all
      ? function(this: Component) {
        return this.shadowRoot!.querySelectorAll(selector)
      }
      : function(this: Component) {
        return this.shadowRoot!.querySelector(selector)
      }
  }
)

export const fragment = (
  strings: TemplateStringsArray,
  ...args: string[]
): DocumentFragment => Object.assign(document.createElement('template'), {
  innerHTML: strings.reduce((out, string, i) => out + args[i - 1] + string)
}).content

export const template = (content: string) => (
  <T extends Component = Component>(target: { new(): T }): void => {
    target.prototype.template = fragment(
      [content] as unknown as TemplateStringsArray
    )
  }
)
