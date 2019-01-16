<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
import sbFieldModel from './sbFieldModel'
import { cloneDeep } from 'lodash'

/**
 * This is a wrapper component to be used with labels, inputs, and helper-text.
 * This component is used to apply a uniform style across all of these components.
 * For eg. if your field has an error because the input has an incorrect value, you can apply the `error` variation to the field.
 * This would cause all of the contained elements to be styled in the error styles.
 */
export default {
  name: 'SbField',
  status: 'prototype',
  release: '0.0.18',
  props: {
    /**
     * Style variation to give additional meaning.
     * `default|warning|error|valid`
     */
    variation: {
      type: String,
      default: 'default',
      validator: value => {
        return value.match(/(default|warning|error|valid)/)
      },
    },
  },
  provide () {
    return {
      sbField: this.sbField,
    }
  },
  data: () => ({
    sbField: cloneDeep(sbFieldModel)
  }),
  computed: {
    classes () {
      return [
        'sb-form-field',
        this.variation
      ]
    }
  },
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
