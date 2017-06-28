/* global dataFlyntFeatureGoogleAnalytics, Cookies */

import $ from 'jquery'
import 'file-loader?name=vendor/js-cookie.js!js-cookie/src/js.cookie'

const $gaOptoutLinks = $('.globalAction-optoutGa')
const data = dataFlyntFeatureGoogleAnalytics

const alreadyOptedOut = getOptoutCookie()

if (alreadyOptedOut) {
  $gaOptoutLinks.remove()
  window['ga-disable-' + data.gaId] = true
} else {
  $gaOptoutLinks.on('click', function (e) {
    e.preventDefault()
    let confirmOptout = false

    if (data.confirm) {
      confirmOptout = window.confirm(data.confirm)
    } else {
      confirmOptout = true
    }

    if (confirmOptout) {
      window['ga-disable-' + data.gaId] = true
      if (data.success) {
        window.alert(data.success)
      }
      setOptoutCookie()
    }
  })
}

function setOptoutCookie () {
  Cookies.set('disableGa', true)
  $gaOptoutLinks.remove()
}

function getOptoutCookie () {
  return Cookies.get('disableGa')
}
