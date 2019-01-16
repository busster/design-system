import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import FormFieldDisplay from './views/FormFieldDisplay.vue'
import SearchableInputDisplay from './views/SearchableInputDisplay.vue'
import TableDisplay from './views/TableDisplay.vue'
import TooltipDisplay from './views/TooltipDisplay.vue'
import ResizeObserverDisplay from './views/ResizeObserverDisplay.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/form-field',
      name: 'form-field',
      component: FormFieldDisplay
    },
    {
      path: '/searchable-input',
      name: 'searchable-input',
      component: SearchableInputDisplay
    },
    {
      path: '/table-display',
      name: 'table-display',
      component: TableDisplay
    },
    {
      path: '/tooltip-display',
      name: 'tooltip-display',
      component: TooltipDisplay
    },
    {
      path: '/resize-observer-display',
      name: 'resize-observer-display',
      component: ResizeObserverDisplay
    }
  ]
})
