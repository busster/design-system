<template>
  <div>
    <p>{{ labelText }}</p>
    <SbTextInput v-model="num"></SbTextInput>
  </div>
</template>

<script>
import SbTextInput from '../FormField/SbTextInput.vue'

export default {
  name: 'SbPaginationInput',
  components: {
    SbTextInput
  },
  props: {
    labelText: {}
  },
  data: () => ({
    num: null
  }),
  mounted () {
    // debugger
  },
  computed: {},
  methods: {},
  filters: {}
}
</script>


<style lang="scss">

</style>
