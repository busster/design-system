<template>
  <div id="app">
    <div id="nav">
      <router-link to="/form-field">FormField</router-link>
      <router-link to="/searchable-input">SearchableInput</router-link>
      <router-link to="/table-display">Table</router-link>
      <router-link to="/tooltip-display">Tooltip</router-link>
      <router-link to="/resize-observer-display">Resize Observer</router-link>
    </div>
    <div id="test-grounds">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#nav {
  padding: 30px;
  border-bottom: 1px solid black;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#test-grounds {
  margin-top: 2em;
  display: flex;
}


@font-face {
  font-family: 'icomoon';
  src:  url('https://i.icomoon.io/public/a8bf25cd13/ShipBob2018/ShipBob-App.eot?z3ecst');
  src:  url('https://i.icomoon.io/public/a8bf25cd13/ShipBob2018/ShipBob-App.eot?z3ecst#iefix') format('embedded-opentype'),
    url('https://i.icomoon.io/public/a8bf25cd13/ShipBob2018/ShipBob-App.woff2?z3ecst') format('woff2'),
    url('https://i.icomoon.io/public/a8bf25cd13/ShipBob2018/ShipBob-App.ttf?z3ecst') format('truetype'),
    url('https://i.icomoon.io/public/a8bf25cd13/ShipBob2018/ShipBob-App.woff?z3ecst') format('woff'),
    url('https://i.icomoon.io/public/a8bf25cd13/ShipBob2018/ShipBob-App.svg?z3ecst#ShipBob-App') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-search-after:after {
  content: "\e986";
  float: right;
  cursor: pointer;
}


// css mixins ---------------------------------------------------------------
@mixin list-unstyled {
  padding-left: 0;
  list-style: none;
}
@mixin border-radius($radius: $border-radius) {
  @if $enable-rounded {
    border-radius: $radius;
  }
}

@mixin border-top-radius($radius) {
  @if $enable-rounded {
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;
  }
}

@mixin border-right-radius($radius) {
  @if $enable-rounded {
    border-top-right-radius: $radius;
    border-bottom-right-radius: $radius;
  }
}

@mixin border-bottom-radius($radius) {
  @if $enable-rounded {
    border-bottom-right-radius: $radius;
    border-bottom-left-radius: $radius;
  }
}

@mixin border-left-radius($radius) {
  @if $enable-rounded {
    border-top-left-radius: $radius;
    border-bottom-left-radius: $radius;
  }
}



</style>
