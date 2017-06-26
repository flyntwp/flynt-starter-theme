/* globals google */

import $ from 'jquery'
import 'file-loader?name=vendor/jquery-throttle-debounce.js!jquery-throttle-debounce/jquery.ba-throttle-debounce'

/* You can use https://mapstyle.withgoogle.com/ to style your map for your needs */
import mapStyles from './json/mapstyles.json'

/* Check the MapOptions object specification at https://developers.google.com/maps/documentation/javascript/reference */
import mapSettings from './json/mapsettings.json'

/* Check the Marker docs at https://developers.google.com/maps/documentation/javascript/markers */
import markerSettings from './json/markersettings.json'

class MapGoogle extends window.HTMLDivElement {
  constructor (self) {
    self = super(self)
    self.$ = $(self)
    self.resolveElements()
    return self
  }

  resolveElements () {
    this.$wrapper = $('.map-wrapper', this)
  }

  connectedCallback () {
    this.location = {
      'lat': this.$wrapper.data('lat'),
      'lng': this.$wrapper.data('lng'),
      'zoom': this.$wrapper.data('zoom')
    }

    this.infoContent = JSON.parse(this.$wrapper.data('content'))

    this.initMap()
    $(window).on('resize', $.debounce(250, this.redrawMap))
  }

  initMap () {
    this.initGoogleMap()
    this.initGoogleMarker()
    this.initInfoWindow()

    this.infoWindow.open(this.marp, this.marker)
  }

  redrawMap = () => {
    this.map.setCenter({
      lat: this.location.lat,
      lng: this.location.lng
    })

    this.map.setZoom(this.location.zoom)
  }

  initGoogleMap () {
    this.gmapSettings = mapSettings
    Object.assign(this.gmapSettings, {
      scrollwheel: false,
      styles: mapStyles,
      center: {
        lat: this.location.lat,
        lng: this.location.lng
      },
      zoom: this.location.zoom
    })
    this.map = new google.maps.Map(this.$wrapper.get(0), this.gmapSettings)
  }

  initGoogleMarker () {
    this.markerSettings = markerSettings
    Object.assign(this.markerSettings, {
      position: {
        lat: this.location.lat,
        lng: this.location.lng
      },
      map: this.map
    })
    this.marker = new google.maps.Marker(this.markerSettings)
  }

  initInfoWindow () {
    this.infoWindow = new google.maps.InfoWindow({
      content: this.infoContent
    })

    this.marker.addListener('click', () => {
      this.infoWindow.open(this.map, this.marker)
    })
  }
}

window.customElements.define('flynt-map-google', MapGoogle, {extends: 'div'})
