import $ from 'jquery'

class NavigationMain extends window.HTMLElement {
  constructor (self) {
    self = super(self)
    self.$ = $(self)
    self.resolveElements()
    return self
  }

  resolveElements () {
    this.$hamburger = $('.hamburger', this)
    this.$navigation = $('.navigationMain', this)
    this.$body = $('body')
  }

  connectedCallback () {
    this.$.on('click', '.hamburger', this.triggerMenu)
  }

  triggerMenu = (e) => {
    e.preventDefault()
    this.$navigation.toggleClass('navigationMain-isActive')
    this.$body.toggleClass('navigationMain-isActive')
  }
}

window.customElements.define('flynt-navigation-main', NavigationMain, {extends: 'nav'})
