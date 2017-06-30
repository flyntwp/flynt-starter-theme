import $ from 'jquery'

class AccordionVertical extends window.HTMLDivElement {
  constructor (self) {
    self = super(self)
    self.$ = $(self)
    self.setOptions()
    self.resolveElements()
    return self
  }

  setOptions () {
    this.aria = {
      hidden: 'aria-hidden',
      controls: 'aria-controls',
      expanded: 'aria-expanded'
    }

    this.class = {
      expanded: 'accordionVertical-item-isExpanded',
      hidden: 'accordionVertical-item-isHidden'
    }
  }

  resolveElements () {
    this.$item = $('.accordionVertical-item', this)
    this.$button = $('.accordionVertical-btn[aria-controls]', this)
    this.$controls = $('.accordionVertical-content', this)
    this.isMultiselectable = this.$.attr('aria-multiselectable')
  }

  connectedCallback () {
    this.$.on('click', this.$button.selector, this.toggleButton)
  }

  showItem ($button) {
    this.toggleItem($button, true)
  }

  hideItem ($button) {
    this.toggleItem($button, false)
  }

  toggleButton = (e, expanded) => {
    e.preventDefault()
    const $button = $(e.currentTarget)
    this.toggleItem($button, expanded)
  }

  /**
   * Toggle an item's "expanded" state, optionally providing a target
   * state.
   *
   * @param {HTMLButtonElement} button
   * @param {boolean?} expanded If no state is provided, the current
   * state will be toggled (from false to true, and vice-versa).
   * @return {boolean} the resulting state
   */
  toggleItem ($button, expanded) {
    const id = $button.attr(this.aria.controls)
    const $item = $button.closest(this.$item.selector)
    const $controls = $(`#${id}`, this)

    if (!$controls.length) {
      throw new Error(
        `No toggle target found with id: ${id}`
      )
    }

    // Check if expanded state provided as parameter
    if (typeof expanded !== 'boolean') {
      expanded = $button.attr(this.aria.expanded) === 'true'
    }

    // Set new expanded state
    expanded = !expanded

    // Reset state of all items if not multiselectable
    if (!this.isMultiselectable) {
      this.hideItems()
    }

    // Apply new state to target
    $button.attr(this.aria.expanded, expanded)
    $controls.attr(this.aria.hidden, !expanded)

    if (expanded) {
      $item.addClass(this.class.expanded)
      $item.removeClass(this.class.hidden)
    } else {
      $item.removeClass(this.class.expanded)
      $item.addClass(this.class.hidden)
    }

    return expanded
  }

  hideItems () {
    this.$button.attr(this.aria.expanded, false)
    this.$controls.attr(this.aria.hidden, true)
    this.$item
      .removeClass(this.class.expanded)
      .addClass(this.class.hidden)
  }
}

window.customElements.define('flynt-accordion-vertical', AccordionVertical, {extends: 'div'})
