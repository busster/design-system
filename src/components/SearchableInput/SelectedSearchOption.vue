<template>
  <div class="input-container">
    <input class="sb-input" :value="value" readonly>
    <span slot="append" class="append icon-search-after"></span>
  </div>
</template>

<script>

/**
 * Input fields allows users to input and edit text.
 */
export default {
  name: 'SbSelectedSearchOption',
  status: 'prototype',
  release: '0.0.18',
  props: ['value'],
  components: {},
  data: () => ({}),
  computed: {}
}
</script>

<style lang="scss" scoped>

</style>
