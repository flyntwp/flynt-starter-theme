import $ from 'jquery'

class BlockCookieNotification extends window.HTMLDivElement {
  constructor (self) {
    self = super(self)
    self.$ = $(self)
    self.resolveElements()
    return self
  }

  resolveElements () {
    this.$element = $('.element', this)
  }

  connectedCallback () {
    
  }
}

window.customElements.define('flynt-block-cookie-notification', BlockCookieNotification, {extends: 'div'})

import './Partials/AcceptButton/script.js'
import './Partials/OptoutLink/script.js'