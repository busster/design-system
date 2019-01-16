<script>
import Popper from 'popper.js'

export default {
  name: 'Popover',
  abstract: true,
  props: {
    /* eslint-disable */
    /**
     * The target of the popover.
     */
    target: {
      required: false,
      default: null
    },
    /* eslint-enable */
    /**
     * Used to determine whether or not to bind the popover to the container.
     * necessary for the first paint of the popover as it
     * may not exist yet when using with `v-if`
     */
    active: {
      type: Boolean,
      default: false
    },
    /* eslint-disable */
    /**
     * Bounding context to fire the intersection callback on the container.
     * Must of type Element.
     */
    boundariesElement: {
      required: false,
      default: null
    },
    /* eslint-enable */
    /**
     * Positions the container with respect to its orientation.
     * This follows the same rules as flex-box
     * One of: `(start|center|end)`
     */
    placement: {
      type: String,
      default: 'start',
      validator: value => value.match(/(center|start|end)/)
    },
    /**
     * Positions the container around the container element.
     * One of: `(top|bottom|left|right)`
     */
    orientation: {
      type: String,
      default: 'top',
      validator: value => value.match(/(top|bottom|left|right)/)
    },
    /**
     * Offset from the container along orientation and placement axes.
     * To configure these, provide an object with the orientation and placement attributes.
     * values can be a percentage, px, or ems.
     */
    offset: {
      type: Object,
      default: () => ({
        orientation: '',
        placement: ''
      })
    },
    positionFixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    targetEl: null,
    popperInstance: null,
    shouldRender: false
  }),
  computed: {
    placementCalc () {
      let placementString = this.orientation
      if (this.placement !== 'center') placementString += `-${ this.placement }`
      return placementString
    },
    defaultOptions () {
      const { orientation: orientationOffset, placement: placementOffset } = this.offset
      return {
        placement: this.placementCalc,
        positionFixed: this.positionFixed,
        modifiers: {
          preventOverflow: {
            boundariesElement: this.boundariesElement,
            enabled: true
          },
          offset: {
            offset: `${ placementOffset }, ${ orientationOffset }`
          }
        }
      }
    },
  },
  watch: {
    active: {
      immediate: true,
      handler (shouldRender) {
        this.shouldRender = shouldRender
        if (shouldRender) {
          this.bindPopper()
        }
      }
    }
  },
  mounted () {
    this.targetEl = this.target || this.$el.parentElement
    this.bindPopper()
  },
  beforeDestroy () {
    this.killPopper()
  },
  methods: {
    bindPopper () {
      this.$nextTick(() => {
        this.createPopper()
      })
    },
    createPopper () {
      if (this.$el.nodeType !== Node.COMMENT_NODE) {
        this.popperInstance = new Popper(this.targetEl, this.$el, this.defaultOptions)
      }
    },
    killPopper () {
      if (this.popperInstance) {
        this.popperInstance.destroy()
        this.popperInstance = null
      }
    }
  },
  /* eslint-disable */
  render () {
    const defaultSlot = this.$slots.default
    if (defaultSlot && defaultSlot[0]) {
      return defaultSlot[0]
    } else {
      console.warn('Popover can only render 1 default slot.')
    }
  },
  /* eslint-enable */
}
</script>
