<template>
  <Popover :active="tooltipVisible" :target="targetEl" :boundariesElement="boundariesElement" :placement="placement" :orientation="orientation" :offset="offset">
    <FadeTransition>
      <template v-if="tooltipVisible">
        <slot/>
      </template>
    </FadeTransition>
  </Popover>
</template>


<script>
import Popover from './Popover'
import FadeTransition from '../FadeTransition'

export default {
  name: 'TooltipV2',
  components: {
    Popover,
    FadeTransition
  },
  props: {
    active: {},
    boundariesElement: {},
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
      default: 'center',
      validator: value => value.match(/(center|start|end)/)
    },
    offset: {}
  },
  watch: {
    immediate: true,
    handler (tooltipVisible) {
      this.tooltipVisible = tooltipVisible
    }
  },
  data: () => ({
    tooltipVisible: false,
    targetEl: null,
    hideTimeout: null,
    showTimeout: null,
  }),
  mounted () {
    this.targetEl = this.$el.parentElement
    
    this.targetEl.addEventListener('mouseenter', this.showTooltip)
    this.targetEl.addEventListener('mouseleave', this.hideTooltip)
  },
  destroyed () {
    this.targetEl.removeEventListener('mouseenter', this.showTooltip)
    this.targetEl.removeEventListener('mouseleave', this.hideTooltip)
  },
  methods: {
    showTooltip () {
      clearTimeout(this.hideTimeout)
      this.showTimeout = setTimeout(() => {
        this.tooltipVisible = true
      }, 500)
    },
    hideTooltip () {
      clearTimeout(this.showTimeout)
      this.hideTimeout = setTimeout(() => {
        this.tooltipVisible = false
      }, 500)
    }
  }
}
</script>
