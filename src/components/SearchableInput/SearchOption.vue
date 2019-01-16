<template>
  <span class="default-search-option" href="#">
    <slot></slot>
  </span>
</template>

<script>

/**
 * Input fields allows users to input and edit text.
 */
export default {
  name: 'SbSearchOption',
  status: 'prototype',
  release: '0.0.18',
  props: {},
  components: {},
  data: () => ({}),
  methods: {}
}
</script>

<style lang="scss">
.default-search-option {
  margin: 0;
}
</style>
