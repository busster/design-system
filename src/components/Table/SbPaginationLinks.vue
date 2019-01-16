<template>
  <ul class="sb-pagination-links">
    <li v-if="$slots['page-link-previous']" @click="prevPage()">
      <slot name="page-link-previous" />
    </li>
    <template
      v-if="$scopedSlots['page-links']"
    >
      <template
        v-for="n in range"
      >
        <li
          :key="n"
          v-if="showPageLink(offsetPage(n))"
          @click="goToPage(offsetPage(n))"
        >
          <slot name="page-links" :page="offsetPage(n)" :active="isActive(offsetPage(n))"></slot>
        </li>
      </template>
    </template>
    <li v-if="$slots['page-link-next']" @click="nextPage()">
      <slot name="page-link-next" />
    </li>
  </ul>
</template>

<script>
import SbPaginationLink from './SbPaginationLink'

export default {
  name: 'SbPaginationLinks',
  components: {
    SbPaginationLink
  },
  props: {
    range: {
      type: Number,
      default: 5
    }
  },
  inject: ['pagination'],
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
    prevPage () {
      let newPageNumber = (this.page - 1 + this.ps) % this.ps
      if (newPageNumber === 0) newPageNumber = this.totalPages
    },
    nextPage () {
      let newPageNumber = (this.page + 1) % this.ps
      if (newPageNumber === 0) newPageNumber = 1
    },
    goToPage (n) {

    },
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

</style>
