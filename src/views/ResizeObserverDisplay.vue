<template>
  <div class="resize-observer-display">
    <div class="controls">

    </div>

    <div class="tests">
      <SbResizeObserver :breakpoints="breakpoints">
        <!-- <h1 slot="md">MEDIUM</h1>
        <h2 slot="sm">SMALL</h2>
        <h3>DEFAULT</h3> -->
        <div slot-scope="{ el }" :class="el.is">
          <h1 v-if="el.is.md">MEDIUM</h1>
          <h2 v-else-if="el.is.sm">SMALL</h2>
          <h3 v-else>DEFAULT</h3>
        </div>
      </SbResizeObserver>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SbResizeObserver from '../components/ResizeObserver/SbResizeObserver.vue'

export default {
  name: 'ResizeObserverDisplay',
  components: {
    SbResizeObserver
  },
  data: () => ({
    breakpoints: {
      sm: el => el.width < 500,
      md: el => el.width >= 500 && el.width < 1000
    }
  })
}
</script>


<style lang="scss">
.resize-observer-display {
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
    // max-width: 300px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    .spacer {
      margin: 1em 0;
    }
    .sm {
      color: pink;
    }
    .md {
      color: blue;
    }
  }
}
</style>
