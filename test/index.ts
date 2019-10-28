import { Component, define, lazy, ref, fragment, template } from '~/index'

it('gets defined', () => {
  @define class Test extends Component { }
  @define class PrefixedTest extends Component { static prefix = 'custom' }
  @define class NotPrefixedTest extends Component { static prefix = undefined }

  expect(customElements.get('x-test')).toBe(Test)
  expect(customElements.get('custom-prefixed-test')).toBe(PrefixedTest)
  expect(customElements.get('not-prefixed-test')).toBe(NotPrefixedTest)
})

it('renders template', () => {
  @template(`<span></span>`) class Test extends Component {
    public customTemplate = fragment`<span>${'test'}</span>`
  }

  const test = new Test()

  expect(Test.prototype.template).toBeInstanceOf(DocumentFragment)
  expect(test.shadowRoot).toBeInstanceOf(ShadowRoot)
  expect(test.shadowRoot!.querySelector('span')).toBeInstanceOf(HTMLElement)
  expect(test.customTemplate.querySelector('span')!.textContent).toBe('test')
})

it('creates references', () => {
  @template(`<ul><li></li><li></li></ul>`) class Test extends Component {
    @lazy @ref('ul') list!: HTMLElement
    @ref('li', { all: true }) items!: HTMLElement[]
  }

  const test = new Test()

  expect(test.list).toBeInstanceOf(HTMLElement)
  expect(test.items).toBeInstanceOf(NodeList)

  test.list.appendChild(document.createElement('li'))
  expect(test.items.length).toBe(3)

  test.shadowRoot!.removeChild(test.list)
  expect(test.list).toBeInstanceOf(HTMLElement)
})
