<template>
  <nav class="sb-pagination">
    <slot name="pagination-links"></slot>
    <slot
      name="pagination-text"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :totalRecords="totalRecords"
      :visibleRecords="visibleRecords"
    ></slot>
    <slot name="pagination-input"></slot>
  </nav>
</template>

<script>

export default {
  name: 'SbPagination',
  components: {},
  props: {
    pagination: {}
  },
   provide () {
    return {
      pagination: this.pagination
    }
  },
  data: () => ({
    
  }),
  mounted () {
    // debugger
  },
  computed: {
    pageSize () {
      return this.pagination.pageSize
    },
    currentPage () {
      return this.pagination.currentPage
    },
    totalPages () {
      return this.pagination.totalPages
    },
    totalRecords () {
      return this.pagination.totalRecords
    },
    visibleRecords () {
      return this.pagination.visibleRecords
    }
  },
  methods: {
    calcPageLinkClasses (pageNum) {

    },
    isActive (n) {
      return n === this.currentPage
    },
    showPageLink (pageNum) {
      return pageNum > 0 && pageNum <= this.totalPages
    },
    offsetPage (n) {
      const mid = Math.ceil(this.range / 2)
      if (n < mid) return this.currentPage - (mid - n)
      return this.currentPage + (n % mid)
    },
    fetchPage (page) {
      this.$emit('fetchPage', {
        page,
        pagination: this.pagination
      })
    }
  },
  filters: {
    fil (val) {
      console.log(val)
    }
  }
}
</script>


<style lang="scss">
.sb-pagination {
  display: flex;
  // @include list-unstyled();
  // @include border-radius();
}
</style>
