import $ from 'jquery'

class BlockCookieNotification_OptoutLink extends window.HTMLElement {
  constructor (self) {
    self = super(self)
    self.$ = $(self)
    self.$component = self.$.closest('.flyntComponent')
    self.resolveElements()

    self.cookieName = 'optout_ga'

    return self
  }

  resolveElements () {

  }

  connectedCallback () {
    this.analyticsCode = this.$.attr('data-analytics')
    this.isAlreadyOptout = this.getCookieValue(this.cookieName)
    
    if (!this.isAlreadyOptout) {
      this.$.addClass('optoutLink-isVisible')
    } else {
      window['ga-disable-' + this.analyticsCode] = true
      this.$.remove()
    }

    this.$.on('click', this.optout)
  }

  optout = (e) => {
    e.preventDefault()
    window['ga-disable-' + this.analyticsCode] = true
    document.cookie = this.cookieName + '=true'
    this.$.remove()
  }

  getCookieValue (cookie) {
    const value = "; " + document.cookie
    const parts = value.split('; ' + cookie + '=')
    if (parts.length == 2) {
      return parts.pop().split(';').shift()
    } else {
      return false
    }
  }
}

window.customElements.define('flynt-block-cookie-notification-partial-optout-link', BlockCookieNotification_OptoutLink, {extends: 'a'})