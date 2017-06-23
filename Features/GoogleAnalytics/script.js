/* global wpData */

import $ from 'jquery'

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
  document.cookie = 'disableGa=true'
  $gaOptoutLinks.remove()
}

function getOptoutCookie () {
  const value = document.cookie
  const parts = value.split('; disableGa=')
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  } else {
    return false
  }
}
