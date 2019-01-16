<template>
  <a class="page-link" href="#" tabindex="-1" @click.prevent>
    <slot />
  </a>
</template>

<script>

export default {
  name: 'SbPaginationLink',
  components: {},
  props: {},
  data: () => ({}),
  mounted () {
    // debugger
  },
  computed: {},
  methods: {},
  filters: {}
}
</script>


<style lang="scss">
.page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.8rem;
  margin-left: -1px;
  line-height: 1.5;
  color: blue;
  background-color: white;
  border: 1px solid black;

  &:hover {
    // color: $pagination-hover-color;
    // text-decoration: none;
    // background-color: $pagination-hover-bg;
    // border-color: $pagination-hover-border-color;
  }

  &:focus {
    z-index: 2;
    outline: 0;
    // box-shadow: $pagination-focus-box-shadow;
  }

  // Opinionated: add "hand" cursor to non-disabled .page-link elements
  &:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
}
</style>
