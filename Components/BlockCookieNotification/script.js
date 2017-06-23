import $ from 'jquery'

import * as acceptButton from './Partials/AcceptButton/script.js'

class BlockCookieNotification extends window.HTMLDivElement {
  constructor (self) {
    self = super(self)
    self.$ = $(self)
    self.setOptions()
    self.resolveElements()
    return self
  }

  setOptions () {
    this.options = {
      acceptButton: acceptButton.getOptions()
    }
  }

  resolveElements () {
    
  }

  connectedCallback () {
    this.$.on('click', '.acceptButton', acceptButton.acceptCookies(this.$, this.options.acceptButton.cookieName, this.options.acceptButton.expireDays))
    acceptButton.checkCookies(this.$, this.options.acceptButton.cookieName)
  }
}

window.customElements.define('flynt-block-cookie-notification', BlockCookieNotification, {extends: 'div'})
