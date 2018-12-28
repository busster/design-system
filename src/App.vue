<template>
  <div id="app">
    <div id="nav">
      <router-link to="/form-field">FormField</router-link>
      <router-link to="/searchable-input">SearchableInput</router-link>
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
</style>
