// name=[location in our vendor folder] ! [location in package folder]
import 'file-loader?name=vendor/normalize.css!normalize.css/normalize.css'
// Webpack looks for dist file in package "main".
import 'file-loader?name=vendor/slick.js!slick-carousel'
import 'file-loader?name=vendor/slick.css!slick-carousel/slick/slick.css'

function importSlickFonts (fontName) { // eslint-disable-line no-unused-vars
  require(`file-loader?name=vendor/slick/[name].[ext]!slick-carousel/slick/fonts/${fontName}`)
}

import slickConfiguration from './sliderConfiguration.js'
import debug from '../debug.js'

class MediaSlider extends window.HTMLDivElement {

  static get observedAttributes () {
    return [
      'data-at1',
      'data-at2',
      'disabled'
    ]
  }

  constructor (self) {
    // this.myCustomElement = true
    self = super(self)
    self.$ = $(self)

    let counter = 0


    self.myCustomElement = true
    console.log(self.myCustomElement)

    var a = debug('worker:a')
    setInterval(function () {
      counter++
      a('doing some work ' + counter)
      self.$.attr('data-at1', counter)
      counter++
      self.$.attr('data-at2', counter)

      if (self.disabled) {
        self.disabled = false
        // self.myCustomElement = false
      } else {
        self.disabled = true
        // self.myCustomElement = true
      }
    }, 2000)

    // console.log(self.$)
    // console.log(self.$.attr('is'))
    self.sliderInitialised = false
    self.isMobile = false
    self.resolveElements()
    return self
  }

  get myCustomElement () {
    console.log('get myCustomElement')
  }

  set myCustomElement (val) {
    console.log('set myCustomElement val: ' + val)
  }

  set disabled (val) {
    // console.log('disabled: ' + val)
    // Reflect the value of `disabled` as an attribute.
    if (val) {
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
  }

  get disabled () {
    return this.hasAttribute('disabled')
  }

  attributeChangedCallback (attr, oldValue, newValue) {
    // console.log(attr)
  }

  resolveElements () {
    this.$mediaSlides = $('.mediaSlider-slides', this)
    this.$posterImage = $('.mediaSlider-oembedPosterImage', this)
    this.$oembedVideo = $('.mediaSlider-oembedVideo iframe', this)
    this.$slides = $('.mediaSlider-slide', this)
  }

  connectedCallback () {
    this.setupSlider()
    this.$posterImage.on('click', this.startVideo.bind(this))
  }

  setupSlider = () => {
    if (this.$slides.length > 1) {
      this.$mediaSlides.slick(slickConfiguration)
    }
  }

  startVideo = (e) => {
    const $currentPosterImage = $(e.target)
    let $iframe =
      $(e.target)
      .closest('.mediaSlider-oembedVideoContainer')
      .find('iframe')
    const iframeSrc = $iframe.data('src')
    $iframe.attr('src', iframeSrc)
    $currentPosterImage.addClass('mediaSlider-oembedPosterImage-isHidden')
  }
}

window.customElements.define('wps-media-slider', MediaSlider, {extends: 'div'})
