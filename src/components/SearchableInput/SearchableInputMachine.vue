<template>
  <div class="searchable-input" v-click-outside="transitionToIdle">

    <div v-if="hasIdleSelectionState" @click="transitionToFocused">
      <slot name="selection" v-bind:selection="value">{{ value }}</slot>
    </div>
    <SbTextInput ref="textInput" @keyup="handleEscape" :tabindex="0" v-show="!hasIdleSelectionState" @focus="transitionToFocused" v-model="searchTerm" @set-label-for="setLabelFor">
      <span slot="append" class="icon-search-after"></span>
    </SbTextInput>
    <Popover :active="hasSelectingState" :offset="offsets" :target="popoverTarget" :placement="'center'" :orientation="'bottom'">
      <fade-transition :duration="100">
        <div v-if="hasSelectingState" class="options">
          <a v-if="hasSelectionOptions" href="#" :class="optionClasses(option)" v-for="(option, index) in options" :key="computeKey(index, option)" @click.prevent="selectOption(option)">
            <slot v-bind:option="option" v-bind:index="index">{{ option }}</slot>
          </a>
          <div v-if="!hasSelectionOptions" class="option empty">
            <slot name="empty-options">{{ emptyOptionsText }}</slot>
          </div>
          <fade-transition :duration="500">
            <loading-spinner v-if="loading" :size="'xtsm'"></loading-spinner>
          </fade-transition>
        </div>
      </fade-transition>
    </Popover>
  </div>
</template>

<script>
import SbTextInput from '../FormField/SbTextInput.vue'
import labelHelper from '../../mixins/labelHelper'
import { debounce, isEqual } from 'lodash'
import FadeTransition from '../FadeTransition'
import Vue from 'vue'
import LoadingSpinner from '../Loading'
import Popover from '../Tooltip/Popover'

class InputMachine {
  constructor (state, context) {
    this.context = context
    this.sharedIdleState = {
      focus: (payload) => {
        const { openSelectionImmediately } = payload
        if (openSelectionImmediately) this.changeStateTo('Focused.Selecting', payload)
        else this.changeStateTo('Focused', payload)
      }
    }
    this.sharedFocusedOnEntry = [
      (payload) => {
        const inputEl = payload && payload.inputEl
        if (inputEl) {
          this.context.$nextTick(() => {
            inputEl.focus()
          })
        }
      }
    ]
    this.state = state
    this.changeStateTo(this.state)
  }
  dispatch (actionName, payload) {
    const state = this.transitions()[this.state]
    const action = state[actionName]
    if (action) action.call(this, payload)
  }
  changeStateTo (newState, payload) {
    this.state = newState
    const { onEntry } = this.transitions()[this.state]
    if (onEntry) onEntry.reduce((prev, func) => func(prev), payload)
  }

  transitions () {
    return {
      'Idle': this.sharedIdleState,
      'Idle.Selection': this.sharedIdleState,
      'Focused': {
        onEntry: this.sharedFocusedOnEntry,
        select: () => {
          this.changeStateTo('Focused.Selecting')
        }
      },
      'Focused.Selecting': {
        onEntry: this.sharedFocusedOnEntry,
        deselect: () => {
          this.changeStateTo('Focused')
        },
      },
    }
  }
}

/**
 * Input fields allows users to input and edit text.
 */
export default {
  name: 'SbSearchableInput',
  status: 'prototype',
  release: '0.0.18',
  props: {
    value: {},
    keyValue: {
      type: String,
      default: 'key'
    },
    options: {
      type: Array,
      default: () => ([])
    },
    debounce: {
      type: Number,
      default: 500
    },
    minSearchTermLength: {
      type: Number,
      default: 3
    },
    emptyOptionsText: {
      type: String,
      default: 'No results found.'
    },
    showSelectedOptions: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    clearSearchOnSelect: {
      type: Boolean,
      default: false
    }
  },
  mixins: [labelHelper],
  components: {
    SbTextInput,
    Popover,
    'fade-transition': FadeTransition,
    'loading-spinner': LoadingSpinner
  },
  data: () => ({
    machine: null,
    search: null,
    searchTerm: '',
    offsets: {
      orientation: '',
      placement: ''
    }
  }),
  mounted () {
    this.machine = new InputMachine(this.idleState, this)
    this.search = debounce(this.searchFunc, this.debounce)
  },
  watch: {
    searchTerm (searchTerm, previousTerm) {
      this.search({ searchTerm, previousTerm })
    }
  },
  computed: {
    popoverTarget () {
      return this.$refs['textInput']
    },
    idleState () {
      return this.shouldShowSelectedOptions ? 'Idle.Selection': 'Idle'
    },
    hasIdleSelectionState () {
      return this.machine && this.machine.state === 'Idle.Selection'
    },
    hasSelectingState () {
      return this.machine && this.machine.state.indexOf('Selecting') > -1
    },
    minSearchTermMet () {
      return this.searchTerm.length >= this.minSearchTermLength
    },
    hasSelectionOptions () {
      return this.options && this.options.length > 0
    },
    isArray () {
      return Array.isArray(this.value)
    },
    shouldShowSelectedOptions () {
      return this.$scopedSlots.selection || this.showSelectedOptions
    },
    inputEl () {
      const inputRef =  this.$refs.textInput.$el
      return inputRef.tagName.toLowerCase() === 'input' ? inputRef : inputRef.querySelector('input')
    }
  },
  methods: {
    handleEscape (e) {
      if (e.keyCode === 27) this.transitionToIdle()
    },
    transitionToIdle () {
      this.inputEl.blur()
      this.machine.changeStateTo(this.idleState)
    },
    transitionToFocused () {
      this.machine.dispatch('focus', {
        inputEl: this.inputEl,
        openSelectionImmediately: this.minSearchTermMet
      })
    },
    searchFunc ({ searchTerm, previousTerm }) {
      if (this.minSearchTermMet) this.machine.dispatch('select')
      else this.machine.dispatch('deselect')
      if (this.hasSelectingState) this.$emit('search', { searchTerm, previousTerm })
    },
    computeKey (index, option) {
      return option[this.keyValue] || index
    },
    optionClasses (option) {
      let classes = ['option']
      if (this.isArray) classes.push('multi')
      if ((this.isArray && this.value.some(v => isEqual(v, option))) || this.value === option) classes.push('selected')
      return classes
    },
    emitNewSelectionOptions (option) {
      const arrCopy = this.value.slice()
      if (arrCopy.some(v => isEqual(v, option))) { // (arrCopy.includes(option)) {
        arrCopy.splice(arrCopy.indexOf(option), 1)
      } else {
        arrCopy.push(option)
      }
      this.$emit('input', arrCopy)
    },
    emitNewSelectionOption (option) {
      this.$emit('input', option)
    },
    selectOption (option) {
      if (this.isArray) this.emitNewSelectionOptions(option)
      else this.emitNewSelectionOption(option)
      this.transitionToIdle()
      if (this.clearSearchOnSelect) this.searchTerm = '' // this.$refs.textInput.clearInput()
    }
  },
  directives: {
    'click-outside': {
      bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) { warn += `Found in component '${compName}'` }
          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },

      unbind: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  }
}
</script>

<style lang="scss">
.searchable-input {
  position: relative;
  .options {
    max-height: 20em;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 1px 24px 2px rgba(27, 23, 59, 0.05), 0px 1px 4px 0px rgba(27, 23, 59, 0.11), 0px 17px 12px -12px rgba(27, 23, 59, 0.28);
    width: 100%;
    color: #2470AF;
    text-align: left;
    background-color: white;
    border: none;
    border-radius: 5px;
    z-index: 1000;
    .option {
      min-height: 1.5em;
      display: flex;
      font-weight: 600;
      color: #2470af;
      padding: 0.6rem 1.4rem;
      cursor: pointer;
      &:hover {
        background: rgba(237, 241, 245, 0.52);
      }
      &:active {
        background: rgba(237, 241, 245, 0.72);
      }
      &:only-child {
        padding-bottom: 1rem;
        padding-top: 1rem;
        margin-bottom: 0;
      }
      &:first-of-type {
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        padding-top: 1rem;
      }
      &:last-of-type {
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        padding-bottom: 1rem;
        margin-bottom: 0;
      }
      .default-search-option {
        width: 100%;
      }
      &.selected {
        background: rgba(237, 241, 245, 0.52);
        &:hover {
          background-color: white;
          &.multi {
            .default-search-option:after {
              content: "\e922";
              float: right;
              color: red;
            }
          }
        }
        .default-search-option:after {
          /* use !important to prevent issues with browser extensions that change fonts */
          font-family: 'icomoon' !important;
          speak: none;
          font-style: normal;
          font-weight: normal;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          /* Better Font Rendering =========== */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: green;
          content: "\e921";
          float: right;
        }
      }
      &.empty {
        cursor: default;
        &:hover {
          background: inherit;
        }
        padding-bottom: 1rem;
        padding-top: 1rem;
        margin-bottom: 0;
      }
    }
  }
}
</style>
