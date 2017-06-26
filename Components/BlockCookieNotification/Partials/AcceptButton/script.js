/* globals Cookies */

import 'file-loader?name=vendor/js-cookie.js!js-cookie/src/js.cookie'

export function getOptions (optionContainer) {
  return {
    expireDays: 7,
    cookieName: 'cookies_accepted'
  }
}

export function acceptCookies ($container, cookieName, expireDays) {
  return function (e) {
    Cookies.set(cookieName, true, {
      expires: expireDays
    })

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

function getCookieValue (cookieName) {
  return Cookies.get(cookieName)
}
