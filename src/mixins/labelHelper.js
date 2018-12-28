export default {
  methods: {
    setLabelFor (id) {
      if (this.$el.parentNode) {
        const label = this.$el.parentNode.querySelector('label')
        if (label) {
          const forAttribute = label.getAttribute('for')
          if (!forAttribute) {
            label.setAttribute('for', id)
          }
        } else {
          this.$emit('set-label-for', id)
        }
      }
    }
  }
}