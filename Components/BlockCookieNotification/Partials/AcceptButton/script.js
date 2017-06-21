import $ from 'jquery'

class BlockCookieNotification_AcceptButton extends window.HTMLDivElement {
  constructor (self) {
    self = super(self)
    self.$ = $(self)
    self.$component = self.$.closest('.flyntComponent')
    self.resolveElements()

    self.expireDays = 7
    self.cookieName = 'cookies_accepted'

    return self
  }

  resolveElements () {

  }

  connectedCallback () {
    this.checkCookies()
    this.$.on('click', this.acceptCookies)
  }

  acceptCookies = (e) => {
    const date = new Date()
    date.setTime(date.getTime() + (this.expireDays*24*60*60*1000))
    document.cookie = this.cookieName + "=true; expires=" + date.toGMTString()

    this.$component.remove()
  }

  checkCookies () {
    const cookiesAccepted = this.getCookieValue(this.cookieName)
    
    if (!cookiesAccepted) {
      this.$component.addClass('cookieNotification-isVisible')
    } else {
      this.$component.remove()
    }
  }

  getCookieValue (cookie) {
    const value = '; ' + document.cookie
    const parts = value.split('; ' + cookie + '=')
    if (parts.length == 2) {
      return parts.pop().split(';').shift()
    } else {
      return false
    }
  }
}

window.customElements.define('flynt-block-cookie-notification-partial-accept-button', BlockCookieNotification_AcceptButton, {extends: 'button'})