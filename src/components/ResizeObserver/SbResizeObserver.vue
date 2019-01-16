<script>
import { throttle } from 'lodash'

export default {
  name: 'ResizeObserver',
  props: {
    
    breakpoints: {
      type: Object,
      default: () => ({})
    },
  },
  data: () => ({
    el: {
      width: 0,
      height: 0,
      is: {}
    }
  }),
  mounted() {
    if (this.breakpoints) {
      this.$nextTick(() => {
        const handleResize = throttle(entries => {
          const cr = entries[0].contentRect
          this.el.width = cr.width
          this.el.height = cr.height
          const conds = Object.assign({}, this.breakpoints || {}, this.$options.breakpoints || {})
          for (const breakpoint in conds) {
            this.$set(this.el.is, breakpoint, conds[breakpoint](this.el))
          }
        }, 500)

        const observer = new ResizeObserver(handleResize)
        if (this.$el instanceof Element)  observer.observe(this.$el)
      })
    }
  },
  render (h) {
    return this.$scopedSlots.default({ el: this.el })
  }
}
</script>