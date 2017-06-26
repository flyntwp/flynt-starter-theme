/* global wpData, Cookies */

import $ from 'jquery'
import 'file-loader?name=vendor/js-cookie.js!js-cookie/src/js.cookie'

const $gaOptoutLinks = $('.globalAction-optoutGa')
const data = wpData

const alreadyOptedOut = getOptoutCookie()

if (alreadyOptedOut) {
  $gaOptoutLinks.remove()
  window['ga-disable-' + data.gaId] = true
} else {
  $gaOptoutLinks.on('click', function (e) {
    e.preventDefault()

    const confirmOptout = window.confirm(data.confirm)

    if (confirmOptout) {
      window['ga-disable-' + data.gaId] = true
      window.alert(data.success)
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
