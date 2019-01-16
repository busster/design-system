<script>
const TWEEN = require('@tweenjs/tween.js')

const calculateDuration = (direction, defaultDuration, propsDuration) => {
  let dur = defaultDuration
  if (propsDuration !== undefined) {
    if (typeof propsDuration === 'object') {
      if (propsDuration[direction] !== undefined) dur = propsDuration[direction]
      else dur = defaultDuration
    } else {
      dur = propsDuration
    }
  }
  return dur
}

const createTween = (el, done, { start, end, duration }) => {
  const tween = new TWEEN.Tween(start)
  tween
    .to(end, duration)
    .onUpdate((object) => {
      el.style.opacity = `${object.opacity}`
    })
    .onComplete(() => {
      done()
    })
  return tween
}

const runAnimation = (tween) => {
  function animate (time) {
    requestAnimationFrame(animate)
    TWEEN.update(time)
  }
  requestAnimationFrame(animate)

  tween.start()
}

/**
 * This is a Fade in and out transition.
 * It is a functional wrapper component that imitates Vue.js's `transition` component.
 */
export default {
  name: 'FadeTransition',
  functional: true,
  render: (createElement, context) => {
    const defaultDuration = 250
    let data = {
      props: Object.assign({}, {
        name: 'FadeTransition',
        css: false
      }, context.props),
      on: {
        beforeEnter (el) {
          el.style.opacity = 0
        },
        enter (el, done) {
          runAnimation(
            createTween(el, done, {
              start: { opacity: 0 },
              end: { opacity: 1 },
              duration: calculateDuration('enter', defaultDuration, context.props.duration)
            })
          )
        },
        leave (el, done) {
          runAnimation(
            createTween(el, done, {
              start: { opacity: 1 },
              end: { opacity: 0 },
              duration: calculateDuration('leave', defaultDuration, context.props.duration)
            })
          )
        }
      }
    }
    return createElement('transition', data, context.children)
  }
}
</script>
