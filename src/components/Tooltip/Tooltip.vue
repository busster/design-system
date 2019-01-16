<template>
  <FadeTransition :duration="transitionSpeed">
    <div
      v-if="tooltipVisible"
      :class="['tooltip', ...classSettings]"
      :style="positionStyles"
    >
      <slot />
    </div>
  </FadeTransition>
</template>

<script>
import FadeTransition from '../FadeTransition'

/**
 * Tooltips identify an element when they are activated.
 * They may contain brief helper text about its function.
 * For example, they may contain aditional about a link text information.
 */
export default {
  name: 'SbTooltip',
  components: {FadeTransition},
  props: {
    beforeEnter: {},
    afterLeave: {},
    /**
     * Will toggle tooltip on and off manually
     */
    tooltipActive: {
      type: Boolean,
      default: false
    },
    /* eslint-disable */
    /**
     * Bounding context to fire the intersection callback on the tooltip.
     * Must of type Element.
     * **Note: this is unstable in Firefox because of the way the browser calculates scroll value. be careful when using with this browser.**
     */
    intersectionElement: {
      required: false,
      default: null
    },
    /* eslint-enable */
    /**
     * Number indicating how long to wait before hiding the tooltip after a user has disabled it.
     * Units: time in `ms`
     */
    hideDelay: {
      type: Number,
      default: null
    },
    /**
     * Number indicating how long to wait before hiding the tooltip after a user has disabled it.
     * Units: time in `ms`
     */
    showDelay: {
      type: Number,
      default: null
    },
    /**
     * Positions the tooltip around the container element.
     * One of: `(top|bottom|left|right)`
     */
    orientation: {
      type: String,
      default: 'top',
      validator: value => value.match(/(top|bottom|left|right)/)
    },
    /**
     * Positions the tooltip with respect to its orientation.
     * This follows the same rules as flex-box
     * One of: `(start|center|end)`
     */
    placement: {
      type: String,
      default: 'start',
      validator: value => value.match(/(center|start|end)/)
    },
    /**
     * Offset from the container along the orientation.
     */
    offset: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    currentWidth: null,
    currentHeight: null,
    targetWidth: null,
    targetHeight: null,
    targetTop: null,
    targetLeft: null,
    targetEl: null,
    hideTimeout: null,
    showTimeout: null,
    tooltipVisible: false,
    tokens: {
      props: {
        duration_default_value: {
          value: 250
        },
        duration_quickly_value: {
          value: 50
        }
      }
    }
  }),
  computed: {
    transitionSpeed () {
      return this.tokens.props.duration_quickly_value.value
    },
    toggleHideDelay () {
      return this.hideDelay || this.tokens.props.duration_default_value.value
    },
    toggleShowDelay () {
      return this.showDelay || this.tokens.props.duration_default_value.value
    },
    classSettings () {
      const classes = []
      classes.push(`tooltip-${this.orientation}-${this.placement}`)
      if (!this.tooltipVisible) classes.push('tooltip-hidden')
      return classes
    },
    foundTarget () {
      return this.targetEl !== null
    },
    xCenterCalc () {
      return this.targetWidth / 2 - this.currentWidth / 2
    },
    yCenterCalc () {
      return this.targetHeight / 2 - this.currentHeight / 2
    },
    fixedOrientationStyles () {
      const styles = {}
      switch (this.orientation) {
      case 'top':
        styles.top = `${this.targetTop - this.currentHeight - this.offset}px`
        styles.left = `${this.targetLeft}px`
        break
      case 'bottom':
        styles.top = `${this.targetTop + this.targetHeight + this.offset}px`
        styles.left = `${this.targetLeft}px`
        break
      case 'left':
        styles.top = `${this.targetTop}px`
        styles.left = `${this.targetLeft - this.currentWidth - this.offset}px`
        break
      case 'right':
        styles.top = `${this.targetTop}px`
        styles.left = `${this.targetLeft + this.targetWidth + this.offset}px`
        break
      }
      return styles
    },
    fixedPlacementStyles () {
      const styles = {}
      if (this.orientation === 'top' || this.orientation === 'bottom') {
        switch (this.placement) {
        case 'center':
          styles.left = `${this.targetLeft + this.xCenterCalc}px`
          break
        case 'start':
          // default position from orientation
          break
        case 'end':
          styles.left = `${this.targetLeft + this.targetWidth - this.currentWidth}px`
          break
        }
      } else {
        switch (this.placement) {
        case 'center':
          styles.top = `${this.targetTop + this.yCenterCalc}px`
          break
        case 'start':
          // default position from orientation
          break
        case 'end':
          styles.top = `${this.targetTop + this.targetHeight - this.currentHeight}px`
          break
        }
      }
      return styles
    },
    positionStyles () {
      if (!this.foundTarget) return
      return Object.assign({}, this.fixedOrientationStyles, this.fixedPlacementStyles, {position: 'fixed'})
    },
  },
  watch: {
    tooltipActive (newVal) {
      this.tooltipVisible = newVal
    }
  },
  mounted () {
    this.targetEl = this.$el.parentElement

    this.targetEl.addEventListener('mouseenter', this.showTooltip)
    this.targetEl.addEventListener('mouseleave', this.hideTooltip)

    this.calculateSizes()
  },
  destroyed () {
    this.targetEl.removeEventListener('mouseenter', this.showTooltip)
    this.targetEl.removeEventListener('mouseleave', this.hideTooltip)
  },
  updated () {
    this.$nextTick(() => {
      this.calculateSizes()
    })
  },
  methods: {
    intersectionHandler () {
      const intersectionElementBounds = this.intersectionElement ? this.intersectionElement.getBoundingClientRect() : document.body.getBoundingClientRect()
      const elementBounds = this.$el.getBoundingClientRect()
      const fullyContained = intersectionElementBounds.left <= elementBounds.left &&
        intersectionElementBounds.top <= elementBounds.top &&
        intersectionElementBounds.left + intersectionElementBounds.width >= elementBounds.left + elementBounds.width &&
        intersectionElementBounds.top + intersectionElementBounds.height >= elementBounds.top + elementBounds.height
      if (!fullyContained) this.$emit('intersect-enter', { intersectionElementBounds, elementBounds })
    },
    calculateSizes () {
      const targetXY = this.targetEl.getBoundingClientRect()
      this.targetTop = targetXY.top
      this.targetLeft = targetXY.left
      this.targetWidth = this.targetEl.offsetWidth
      this.targetHeight = this.targetEl.offsetHeight
      this.currentWidth = this.$el.offsetWidth
      this.currentHeight = this.$el.offsetHeight
    },
    showTooltip () {
      clearTimeout(this.hideTimeout)
      this.showTimeout = setTimeout(() => {
        this.tooltipVisible = true
        setTimeout(() => {
          this.intersectionHandler()
        }, 0)
      }, this.toggleShowDelay)
    },
    hideTooltip () {
      clearTimeout(this.showTimeout)
      this.hideTimeout = setTimeout(() => {
        this.tooltipVisible = false
      }, this.toggleHideDelay)
    }
  },
}
</script>

<style lang="scss" scoped >
  .tooltip {
    position: absolute;
    background: white;
    border-radius: 5px;
    -webkit-box-shadow: 0px 1px 24px 2px rgba(27, 23, 59, 0.05), 0px 1px 4px 0px rgba(27, 23, 59, 0.11), 0px 17px 12px -12px rgba(27, 23, 59, 0.28);
    box-shadow: 0px 1px 24px 2px rgba(27, 23, 59, 0.05), 0px 1px 4px 0px rgba(27, 23, 59, 0.11), 0px 17px 12px -12px rgba(27, 23, 59, 0.28);
    opacity: 1;
    transition: opacity 250ms;
    z-index: 99999;
  }
  .tooltip-hidden {
    opacity: 0;
  }
</style>
