<template>
  <div class="TableDisplay">
    <div class="controls"></div>

    <div id="bound" class="tests">
      <span>
        <a href="#">activate</a>
        <Tooltip :boundariesElement="boundariesElement" :placement="'start'" :orientation="'right'" :offset="offsets">
          <div class="bigasstooltip">test</div>
        </Tooltip>
      </span>
    </div>
  </div>
</template>

<script>
import Tooltip from '../components/Tooltip/TooltipFunctional.vue'

export default {
  name: 'TooltipDisplay',
  components: {
    Tooltip
  },
  data: () => ({
    boundariesElement: null,
    offsets: {
      orientation: '10px',
      placement: ''
    }
  }),
  methods: {},
  mounted () {
    // this.boundariesElement = document.getElementById('bound')
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
    height: 600px;
    align-items: center;

    span {
      height: 50px;
      background-color: yellow;
    }

    .bigasstooltip {
      width: 100px;
      height: 100px;
      background: pink;
    }
  }
}
</style>
