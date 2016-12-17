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
  constructor (self) {
    self = super(self)
    self.$ = $(self)

    var a = debug('worker:a')
    setInterval(function () {
      a('doing some work')
    }, 2000)

    // console.log(self.$)
    // console.log(self.$.attr('is'))
    self.sliderInitialised = false
    self.isMobile = false
    self.resolveElements()
    return self
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
