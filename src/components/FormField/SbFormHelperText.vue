<template>
  <p class="helper-text">
    <slot></slot>
    <span v-if="hasCounter" class="counter-text">{{ textValueLength }} / {{ maxLengthValue || counterValue }}</span>
  </p>
</template>

<script>
import sbFieldModel from './sbFieldModel'

/**
 * Input fields allows users to input and edit text.
 */
export default {
  name: 'SbFormHelperText',
  status: 'prototype',
  release: '0.0.18',
  props: {
    counter: {
      type: Number,
      default: null
    },
  },
  inject: ['sbField'],
  mounted () {
    this.sbField.counter = this.sbField.counter || this.counter
  },
  computed: {
    hasCounter () {
      return this.maxLengthValue !== null || this.counterValue !== null
    },
    textValueLength () {
      return this.sbField.value && this.sbField.value.length || 0
    },
    maxLengthValue () {
      return this.sbField.maxLength
    },
    counterValue () {
      return this.sbField.counter
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
