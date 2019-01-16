<template>
  <div class="searchable-input" v-click-outside="hideOptions">
    <div v-if="shouldShowSelectedOptions" @click="toggleShowSelection">
      <slot name="selection" v-bind:selection="value">{{ value }}</slot>
    </div>
    <SbTextInput ref="textInput" @focus="showOptions" @blur="showSelected" v-show="!shouldShowSelectedOptions" v-model="searchTerm" @set-label-for="setLabelFor">
      <span slot="append" class="icon-search-after"></span>
    </SbTextInput>
    <FadeTransition :duration="100">
      <div v-if="searching" class="options">
        <div v-if="hasSelectionOptions" :class="optionClasses(option)" v-for="(option, index) in options" :key="computeKey(index, option)" @click="selectOption(option)">
          <slot v-bind:option="option" v-bind:index="index">{{ option }}</slot>
        </div>
        <div v-if="!hasSelectionOptions" class="option empty">
          <slot name="empty-options">{{ emptyOptionsText }}</slot>
        </div>
      </div>
    </FadeTransition>
  </div>
</template>

<script>
import SbTextInput from '../FormField/SbTextInput.vue'
import labelHelper from '../../mixins/labelHelper'
import { debounce } from 'lodash'
import FadeTransition from '../FadeTransition'

/**
 * Input fields allows users to input and edit text.
 */
export default {
  name: 'SbSearchableInput',
  status: 'prototype',
  release: '0.0.18',
  props: {
    options: {
      type: Array,
      default: () => ([])
    },
    keyValue: {
      type: String,
      default: 'key'
    },
    value: {},
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
  },
  mixins: [labelHelper],
  components: {
    SbTextInput,
    FadeTransition
  },
  data: () => ({
    showSelection: false,
    searchTerm: '',
    search: null,
    searching: false,
    machine: null
  }),
  mounted () {
    this.search = debounce(this.searchFunc, this.debounce)
    if (this.value) this.showSelection = true
  },
  watch: {
    searchTerm (searchTerm, previousTerm) {
      this.search({ searchTerm, previousTerm })
    }
  },
  computed: {
    hasSelectionOptions () {
      return this.options && this.options.length > 0
    },
    minSearchTermMet () {
      return this.searchTerm.length >= this.minSearchTermLength
    },
    shouldShowSelectedOptions () {
      return this.selectedOptionsOn && this.showSelection
    },
    selectedOptionsOn () {
      return this.showSelectedOptions || this.$scopedSlots.selection
    },
    isArray () {
      return Array.isArray(this.value)
    }
  },
  methods: {
    searchFunc ({ searchTerm, previousTerm }) {
      if (!this.minSearchTermMet) return
      this.searching = true
      this.$emit('search', { searchTerm, previousTerm })
    },
    toggleShowSelection (actuallyShowSelection = true) {
      this.searching = true
      if (this.selectedOptionsOn) {
        if (actuallyShowSelection) this.showSelection = !this.showSelection
        if (!this.showSelection) {
          const inputRef = this.$refs.textInput.$el
          const input = inputRef.tagName.toLowerCase() === 'input' ? inputRef : inputRef.querySelector('input')
          this.$nextTick(() => {
            input.focus()
          })
        }
      }
    },
    emitNewSelectionOptions (option) {
      const arrCopy = this.value.slice()
      if (arrCopy.includes(option)) {
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
      this.toggleShowSelection(false)
      this.searching = false
    },
    hideOptions () {
      this.$nextTick(() => {
        this.searching = false
      })
    },
    showOptions () {
      if (this.minSearchTermMet) this.searching = true
    },
    showSelected () {
      this.showSelection = true
    },
    computeKey (index, option) {
      return option[this.keyValue] || index
    },
    optionClasses (option) {
      let classes = ['option']
      if (this.isArray) classes.push('multi')
      if ((this.isArray && this.value.includes(option)) || this.value === option) classes.push('selected')
      return classes
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
    display: flex;
    flex-direction: column;
    position: absolute;
    box-shadow: 0px 1px 24px 2px rgba(27, 23, 59, 0.05), 0px 1px 4px 0px rgba(27, 23, 59, 0.11), 0px 17px 12px -12px rgba(27, 23, 59, 0.28);
    width: 100%;
    color: #2470AF;
    text-align: left;
    background-color: white;
    border: none;
    border-radius: 5px;
    z-index: 1000;
    .option {
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
      &.selected {
        background: rgba(237, 241, 245, 0.52);
        &:hover {
          background-color: white;
          .multi.default-search-option:after {
            content: "\e922";
            float: right;
            color: red;
          }
        }
        .default-search-option:after {
          /* use !important to prevent issues with browser extensions that change fonts */
          // font-family: 'icomoon' !important;
          color: green;
          content: "\e921";
        }
      }
      &.empty {
        cursor: default;
        &:hover {
          background: inherit;
        }
      }
    }
  }
}
</style>
