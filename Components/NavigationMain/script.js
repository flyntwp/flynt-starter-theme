import $ from 'jquery'

class NavigationMain extends window.HTMLElement {
  constructor (self) {
    self = super(self)
    self.$ = $(self)
    self.resolveElements()
    self.setOptions()
    return self
  }

  resolveElements () {
    this.$hamburger = $('.hamburger', this)
    this.$menu = $('.menu', this)
    this.$body = $('body')
  }

  setOptions () {
    this.options = {
      noTransitionClass: 'menu-hasNoTransition',
      activeMenuClass: 'navigationMain-isActive'
    }

    this.enableTransitionTimeout = false
  }

  connectedCallback () {
    this.$.on('click', '.hamburger', this.triggerMenu)
    $(window).on('resize', this.handleTransitionState)
  }

  triggerMenu = (e) => {
    e.preventDefault()
    this.$.toggleClass(this.options.activeMenuClass)
    this.$body.toggleClass(this.options.activeMenuClass)
  }

  handleTransitionState = () => {
    this.disableMenuTransition()
    clearTimeout(this.enableTransitionTimeout)
    this.enableTransitionTimeout = setTimeout(this.enableMenuTransition, 150)
  }

  disableMenuTransition () {
    this.$menu.addClass(this.options.noTransitionClass)
  }

  enableMenuTransition = () => {
    this.$menu.removeClass(this.options.noTransitionClass)
  }
}

window.customElements.define('flynt-navigation-main', NavigationMain, {extends: 'nav'})
