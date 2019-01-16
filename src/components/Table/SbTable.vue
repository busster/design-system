<template>
  <div class="sb-table">
    <!-- <AgGridVue
      style="width: 600px; height: 500px;"
      class="ag-theme-balham"
      :row-data="data"
      :column-defs="columnDefs"
    /> -->
    <slot name="pagination"></slot>
  </div>
</template>

<script>
// import {AgGridVue} from 'ag-grid-vue'
// import '../../../node_modules/ag-grid-community/dist/styles/ag-grid.css'
// import '../../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css'

import SbPagination from './SbPagination.vue'
// import CellRendererHelper from './CellRendererHelper.js'

export default {
  name: 'SbTable',
  components: {
    // AgGridVue,
    SbPagination
  },
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    columnDefinitions: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    
  }),
  mounted () {
    // debugger
    // const els = document.getElementsByClassName('ag-row')
    // for (let i = 0; i < els.length; i++) {
    //   const element = els[i]
    //   const transform = element.style.transform
    //   element.addEventListener("transitionend", function (event) {
    //     element.style.transform = ''
    //     if (event.propertyName === 'opacity') element.style.transform = transform
    //   }, false)
    // }
    // .forEach(element => {
    // })
  },
  computed: {
    columnDefs () {
      return this.columnDefinitions.map(def => {
        const d = {...def}
        const scopedSlot = this.$scopedSlots[def.field]
        if (scopedSlot) d.cellRendererFramework = CellRendererHelper(scopedSlot)
        return d
      })
    }
  },
  methods: {}
}
</script>


<style lang="scss">

</style>
