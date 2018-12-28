<template>
  <div>
    <div v-show="showSelection" @click="toggleShowSelection">{{value}}</div>
    <SbTextInput ref="textInput" v-show="!showSelection" v-model="searchTerm" @set-label-for="setLabelFor">
      <span slot="append">SI</span>
    </SbTextInput>
    <div v-if="searching">
      <div v-for="(option, index) in options" :key="computeKey(index, option)" @click.prevent="selectOption(option)">
        <slot v-bind:option="option" v-bind:index="index">{{ option }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import SbTextInput from '../FormField/SbTextInput.vue'
import labelHelper from '../../mixins/labelHelper'

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
    value: {

    },

  },
  mixins: [labelHelper],
  components: {
    SbTextInput
  },
  data: () => ({
    showSelection: false,
    searching: true,
    searchTerm: '',
  }),
  mounted () {
    // debugger
  },
  computed: {
    // searchString: {
    //   get () {
    //     return this.value
    //   },
    //   set (newVal) {
    //     this.$emit('input', newVal)
    //   }
    // }
  },
  methods: {
    toggleShowSelection () {
      this.showSelection = !this.showSelection
      if (!this.showSelection) {
        const inputRef = this.$refs.textInput.$el
        const input = inputRef.tagName.toLowerCase() === 'input' ? inputRef : inputRef.querySelector('input')
        this.$nextTick(() => {
          input.focus()
        })
      }
    },
    selectOption (option) {
      this.$emit('input', option)
      this.toggleShowSelection()
    },
    computeKey (index, option) {
      return option[this.keyValue] || index
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
