import Vue from "vue"

let mynode

export default (render) => Vue.extend({
  name: 'CellRendererHelper',
  functional: true,
  render: (h) => {
    return mynode
    // return h('span', {}, [mynode])
  },
  created () {
    console.log(this.params)
    mynode = render(this.params)
  }
})
