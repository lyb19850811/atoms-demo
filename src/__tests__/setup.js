import '@testing-library/jest-dom'

// jsdom 未实现 Element.scrollTo，测试环境提供空实现
if (typeof Element !== 'undefined' && !Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {}
}
