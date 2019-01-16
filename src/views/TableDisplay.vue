<template>
  <div class="TableDisplay">
    <div class="controls"></div>

    <div class="tests">
      <SbTable :data="tableData" :columnDefinitions="columnDefinitions">
        <SbPagination slot="pagination" :pagination="pagination">
          <SbPaginationLinks slot="pagination-links" :range="3">
            <SbPaginationLink slot="page-link-previous">{{ 'previous' | i18 }}</SbPaginationLink>
            <SbPaginationLink slot="page-links" slot-scope="{ page, active }">{{ page | i18Num }}</SbPaginationLink>
            <SbPaginationLink slot="page-link-next">{{ 'next' | i18 }}</SbPaginationLink>
          </SbPaginationLinks>
          <SbPaginationText slot="pagination-text" slot-scope="{ currentPage, totalPages, totalRecords, visibleRecords }">Page {{ currentPage }} of {{ totalPages }} | Showing {{ visibleRecords }} of {{ totalRecords }}</SbPaginationText>
          <SbPaginationInput slot="pagination-input" :labelText="'Go to page: '"></SbPaginationInput>
        </SbPagination>
      </SbTable>

      <!-- <br>

      <SbTable :data="tableData" :columnDefinitions="columnDefinitions">
        <SbPagination slot="pagination" :pagination="pagination">
          <SbPaginationLinks slot="pagination-links" :range="3">
            <SbPaginationLink slot="page-link-previous">{{ 'previous' | i18 }}</SbPaginationLink>
            <SbPaginationLink slot="page-links" slot-scope="{ page, active }">{{ page | i18Num }}</SbPaginationLink>
            <SbPaginationLink slot="page-link-next">{{ 'next' | i18 }}</SbPaginationLink>
          </SbPaginationLinks>
          <SbPaginationText slot="pagination-text" slot-scope="{ currentPage, totalPages, totalRecords, visibleRecords }">Page {{ currentPage }} of {{ totalPages }} | Showing {{ visibleRecords }} of {{ totalRecords }}</SbPaginationText>
          <SbPaginationInput slot="pagination-input" :labelText="'Go to page: '"></SbPaginationInput>
        </SbPagination>
      </SbTable>

      <br>

      <SbTable :data="tableData" :columnDefinitions="columnDefinitions">
        <SbPagination slot="pagination" :pagination="pagination">
          <SbPaginationLinks slot="pagination-links" :range="3">
            <SbPaginationLink slot="page-link-previous">{{ 'previous' | i18 }}</SbPaginationLink>
            <SbPaginationLink slot="page-links" slot-scope="{ page, active }">{{ page | i18Num }}</SbPaginationLink>
            <SbPaginationLink slot="page-link-next">{{ 'next' | i18 }}</SbPaginationLink>
          </SbPaginationLinks>
          <SbPaginationText slot="pagination-text" slot-scope="{ currentPage, totalPages, totalRecords, visibleRecords }">Page {{ currentPage }} of {{ totalPages }} | Showing {{ visibleRecords }} of {{ totalRecords }}</SbPaginationText>
          <SbPaginationInput slot="pagination-input" :labelText="'Go to page: '"></SbPaginationInput>
        </SbPagination>
      </SbTable> -->
    </div>
  </div>
</template>

<script>
import SbTable from '../components/Table/SbTable.vue'
import SbPagination from '../components/Table/SbPagination.vue'
import SbPaginationLinks from '../components/Table/SbPaginationLinks.vue'
import SbPaginationLink from '../components/Table/SbPaginationLink.vue'
import SbPaginationText from '../components/Table/SbPaginationText.vue'
import SbPaginationInput from '../components/Table/SbPaginationInput.vue'
import Tooltip from '../components/Tooltip/TooltipFunctional.vue'

export default {
  name: 'TableDisplay',
  components: {
    SbTable,
    SbPagination,
    SbPaginationLinks,
    SbPaginationLink,
    SbPaginationText,
    SbPaginationInput,
    Tooltip
  },
  data: () => ({
    columnDefinitions: [
      {headerName: 'Make', field: 'make'},
      {headerName: 'Model', field: 'model'},
      {headerName: 'Price', field: 'price'}
    ],
    tableData: [
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000}
    ],
    pagination: {
      pageSize: 25,
      currentPage: 4,
      totalPages: 100,
      totalRecords: 2500,
      visibleRecords: 25
    },
    local: 'hello',
    shouldActivate: false
  }),
  methods: {
    doThing (value) {
      console.log(value)
      this.local = '$ASDF'
    },
    handlePositionEnter (el) {
      const parent = el.closest('.ag-row')
      const cachedTransform = parent.style.transform
      parent.cachedTransform = cachedTransform
      parent.style.transform = ''
    },
    handlePositionLeave (el) {
      const parent = el.closest('.ag-row')
      parent.style.transform = parent.cachedTransform
    }
  },
  filters: {
    i18Num (num) {
      return `00${num}`
    },
    i18 (val) {
      return val.toUpperCase()
    }
  }
}
</script>


<style lang="scss">
.TableDisplay {
  width: 100%;
  .controls {
    display: flex;
    justify-content: center;
    width: 50%;
    margin-bottom: 5em;
    flex-direction: column;
    margin: 0 auto 5em;
  }
  .tests {
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
