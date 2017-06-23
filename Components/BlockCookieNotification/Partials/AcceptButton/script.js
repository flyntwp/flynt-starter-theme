import $ from 'jquery'

export function getOptions (optionContainer) {
    return {
      expireDays: 7,
      cookieName: 'cookies_accepted'
    }
  }

export function acceptCookies ($container, cookieName, expireDays) {
  return function (e) {
    const date = new Date()
    date.setTime(date.getTime() + (expireDays*24*60*60*1000))
    document.cookie = cookieName + "=true; expires=" + date.toGMTString()

    $container.remove()
  }
}

export function checkCookies ($container, cookieName) {
    const cookiesAccepted = getCookieValue(cookieName)
    
    if (!cookiesAccepted) {
      $container.addClass('cookieNotification-isVisible')
    } else {
      $container.remove()
    }
  }



function getCookieValue (cookie) {
  const value = "; " + document.cookie
  const parts = value.split('; ' + cookie + '=')
  if (parts.length == 2) {
    return parts.pop().split(';').shift()
  } else {
    return false
  }
}
