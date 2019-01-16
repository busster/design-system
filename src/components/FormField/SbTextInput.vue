<template>
  <div
    v-if="hasAppendOrPrependText"
    class="input-container"
    @click="focusInput"
  >
    <span
      v-if="hasPrependText"
      class="prepend"
    >
      <slot name="prepend">
        {{ prepend }}
      </slot>
    </span>
    <input
      :id="internalId"
      v-bind="attrs"
      :class="classes"
      :placeholder="placeholder"
      :type="type"
      :maxlength="maxLengthValue"
      v-on="listeners"
      @input="inputChanged"
    >
    <span
      v-if="hasAppendText"
      class="append"
    >
      <slot name="append">
        {{ append }}
      </slot>
    </span>
  </div>
  <input
    v-else
    :id="internalId"
    v-bind="attrs"
    :class="classes"
    :placeholder="placeholder"
    :type="type"
    :maxlength="maxLengthValue"
    v-on="listeners"
    @input="inputChanged"
  >
</template>

<script>
import sbFieldModel from './sbFieldModel'
import labelHelper from '../../mixins/labelHelper'

/**
 * Text Inputs allows users to input text. :)
 */
export default {
  name: 'SbTextInput',
  status: 'prototype',
  release: '0.0.18',
  props: {
    /**
     * String to be used as the input placeholder text.
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * String to be appended to the input box.
     * This prop text is actually used as the default value of a named slot: `append`.
     * If for some reason you have some special html markup you would like to append to the input box in leiu of a simple `span` with text,
     * eg. `<p slot="append">my appended text</p>`.
     * you can use the named slot.
     */
    append: {
      type: String,
      default: ''
    },
    /**
     * String to be prepended to the input box.
     * This prop text is actually used as the default value of a named slot: `prepend`.
     * If for some reason you have some special html markup you would like to append to the input box in leiu of a simple `span` with text,
     * eg. `<p slot="prepend">my prepended text</p>`.
     * you can use the named slot.
     */
    prepend: {
      type: String,
      default: ''
    },
    /**
     * Text alignment of the input box. Can be `left|center|right`
     */
    align: {
      type: String,
      default: 'left',
      validator: value => {
        return value.match(/(left|center|right)/)
      },
    },
    /**
     * Type of text input. Can be `text|tel|email|url|search|password`
     */
    type: {
      type: String,
      default: 'text',
      validator: value => {
        return value.match(/(text|tel|email|url|search|password)/)
      }
    },
    /**
     * html id of the input element. default will be set as the Vue component _uid.
     */
    id: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: ''
    },
    /**
     * If you are using this input as part of the SbField pattern with SbFieldHelperText, counter is used to set the upper limit of the Field.
     * *This does not actually set a maxlength property on the input. It is only used as a visual inside the SbFieldHelperText.*
     */
    counter: {
      type: Number,
      default: null
    },
    /**
     * Sets the max possible length on the text input. If you are using this input as part of the SbField pattern with SbFieldHelperText, maxlength is used to set the upper limit of the Field and appear in SbFieldHelperText.
     */
    maxlength: {
      type: Number,
      default: null
    }
  },
  mixins: [labelHelper],
  inject: {
    sbField: {
      default: Object.assign({}, sbFieldModel)
    }
  },
  data: () => ({
    internalId: null,
    defaultField: Object.assign({}, sbFieldModel),
    fieldKey: 'defaultField'
  }),
  watch: {
    value (n, o) {
      // this[this.fieldKey].value = n
    }
  },
  computed: {
    attrs () {
      const attrs = Object.assign({}, this.$attrs)
      console.log('attrs ')
      // delete attrs.value
      attrs.value = this[this.fieldKey].value = this.value
      return attrs
    },
    listeners () {
      const list = Object.assign({}, this.$listeners)
      delete list.input
      return list
    },
    maxLengthValue () {
      return this[this.fieldKey].maxLength || this.maxlength
    },
    hasAppendText () {
      return this.append.length > 0 || this.$slots.append
    },
    hasPrependText () {
      return this.prepend.length > 0 || this.$slots.prepend
    },
    hasAppendOrPrependText () {
      return this.hasAppendText || this.hasPrependText
    },
    classes () {
      const classList = ['sb-input']
      if (this.align !== 'left') classList.push(`sb-input-${this.align}`)
      return classList
    }
  },
  mounted () {
    if (this.sbField.__ob__) {
      this.fieldKey = 'sbField'
      this.defaultField = null
    }
    this.setId()
    this.setLabelFor(this.internalId)
    this.setTextValue()
    this.setCounterValue()
  },
  methods: {
    inputChanged (e) {
      const val = e.target.value
      // this[this.fieldKey].value = val
      // console.log('inputChanged ', this[this.fieldKey].value)
      this.$emit('input', val)
    },
    focusInput (e) {
      e.currentTarget.querySelector('input').focus()
    },
    setId () {
      this.internalId = this.id || this._uid
    },
    setTextValue () {
      // __ob__
      this[this.fieldKey].value = this[this.fieldKey].value || this.value
      // this.$set('sbField.value', this.sbField.value || this.value)
      // console.log('setTextValue ', this[this.fieldKey].value)
    },
    setCounterValue () {
      this[this.fieldKey].counter = this[this.fieldKey].counter || this.counter
      this[this.fieldKey].maxLength = this[this.fieldKey].maxLength || this.maxlength
    },
    clearInput () {
      this[this.fieldKey].value = ''
    }
  },
}
</script>

<style lang="scss">
.sb-input {
  background: white;
  outline: none;
  border: 1px solid #48566e;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px 0 rgba(52, 62, 79, 0.1);
  font-size: .875rem;
  border: 0.06rem solid #d3d9e2;
  padding: 0.60rem .70rem 0.55rem;
}
.input-container:hover, input:hover {
  border: 0.1rem solid #d3d9e2;
  padding: 0.56rem .66rem 0.51rem;
}
.input-container:focus-within, input:focus {
  border: 0.1rem solid #7788a5;
  padding: 0.56rem .66rem 0.51rem;
}
.sb-input-right {
  text-align: right;
}
.sb-input-center {
  text-align: center;
}
input::placeholder {
  font-style: italic;
  opacity: 0.75;
}
.input-container {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  line-height: 1;
  background: white;
  color: #3c485b;
  outline: none;
  border: 1px solid #48566e;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px 0 rgba(52, 62, 79, 0.1);
  font-size: .875rem;
  border: 0.06rem solid #d3d9e2;
  padding: 0.60rem .70rem 0.55rem;
  cursor: text;
  .prepend, .append {
    color: #7788a5;
  }
  .sb-input {
    box-shadow: none;
    border: none;
    width: 100%;
    padding: 0 2px;
  }
}
</style>
