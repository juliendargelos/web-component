export abstract class Component extends HTMLElement {
  public static prefix?: string = 'x'

  public static get tagName(): string {
    return (this.prefix ? `${this.prefix}-` : '') + this.name
      .replace(/([^A-Z])([A-Z]+)/g, '$1-$2')
      .toLowerCase()
  }

  public template?: DocumentFragment

  public constructor() {
    super() /* istanbul ignore next */

    this.template && this
      .attachShadow({ mode: 'open' })
      .appendChild(this.template!.cloneNode(true))
  }
}
