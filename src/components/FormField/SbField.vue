<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import sbFieldModel from './sbFieldModel'

/**
 * Input fields allows users to input and edit text.
 */
export default {
  name: 'SbField',
  status: 'prototype',
  release: '0.0.18',
  props: {
    /**
     * Style variation to give additional meaning.
     * `primary, secondary`
     */
    variation: {
      type: String,
      default: 'default',
      validator: value => {
        return value.match(/(default|warning|error|valid)/)
      },
    },
    value: {
      default: null
    }
  },
  provide () {
    return {
      sbField: this.sbField,
    }
  },
  created () {
    this.sbField.value = this.value
  },
  data: () => ({
    sbField: Object.assign({}, sbFieldModel)
  }),
  updated () {
    // debugger
  },
  watch: {
    fieldValue (newValue) {
      this.$emit('input', newValue)
    }
  },
  computed: {
    fieldValue () {
      return this.sbField.value
    },
    classes () {
      return [
        'sb-form-field',
        this.variation
      ]
    }
  }
}
</script>

<style lang="scss">
.sb-form-field {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  label {
    color: #445168;
    font-size: .875rem;
    font-weight: 600;
  }
  p.helper-text {
    margin: 0;
    padding-top: 0.1rem;
    font-size: 0.8125rem;
    color: #95a3ba;
    display: flex;
    justify-content: space-between;
    .counter-text {
      padding-left: 1em;
    }
  }
  &.error {
    label {
      color: #AA1515;
    }
    .input-container, input {
      border-color: #AA1515;
      color: #AA1515;
      background: #fef3f3;
    }
    // EXPERIMENT WITH HOVER COLORS AND SHIT
    // .input-container:hover, input:hover {
    //   border: 0.1rem solid rgb(143, 20, 20);
    //   padding: 0.56rem .66rem 0.51rem;
    // }
    // .input-container:focus-within, input:focus {
    //   border: 0.1rem solid rgb(109, 14, 14);
    //   padding: 0.56rem .66rem 0.51rem;
    // }
    input::placeholder {
      color: #AA1515;
      opacity: 0.5;
    }
    .input-container {
      .prepend, .append {
        color: rgb(223, 113, 113);
      }
    }
    p.helper-text {
      color: #AA1515;
    }
  }
  &.warning {
    label {
      color: #ad5f13;
    }
    .input-container, input {
      border-color: #DB7818;
      color: #ad5f13;
      background: #fef9f4;
    }
    input::placeholder {
      color: #ad5f13;
      opacity: 0.5;
    }
    .input-container {
      .prepend, .append {
        color: #dd9f61;
      }
    }
    p.helper-text {
      color: #ad5f13;
    }
  }
  &.valid {
    label {
      color: #236e16;
    }
    .input-container, input {
      border-color: #31991E;
      color: #236e16;
      background: #e8fae5;
    }
    input::placeholder {
      color: #236e16;
      opacity: 0.5;
    }
    .input-container {
      .prepend, .append {
        color: #6ba161;
      }
    }
    p.helper-text {
      color: #236e16;
    }
  }
}
</style>
